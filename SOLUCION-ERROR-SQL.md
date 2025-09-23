# 🔧 SOLUCIÓN AL ERROR DE FOREIGN KEY CONSTRAINT

## 🚨 **PROBLEMA IDENTIFICADO**
El error que estás viendo es:
```
ERROR: 23503: insert or update on table "user_profiles" violates foreign key constraint "user_profiles_user_id_fkey"
DETAIL: Key (user_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
```

**Causa**: El script SQL intenta insertar datos de ejemplo con IDs de usuario que no existen en la tabla `auth.users` de Supabase.

---

## ✅ **SOLUCIÓN PASO A PASO**

### **Paso 1: Limpiar la Base de Datos**
Si ya ejecutaste el script anterior, necesitas limpiar los datos problemáticos:

1. Ve a tu dashboard de Supabase: https://supabase.com/dashboard/project/hfxblzrjhdibxdbkxost
2. Haz clic en **"SQL Editor"**
3. Ejecuta este comando para limpiar:

```sql
-- Limpiar datos problemáticos
DELETE FROM user_profiles WHERE user_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM user_profiles WHERE user_id = '00000000-0000-0000-0000-000000000002';
DELETE FROM user_profiles WHERE user_id = '00000000-0000-0000-0000-000000000003';
DELETE FROM user_profiles WHERE user_id = '00000000-0000-0000-0000-000000000004';
DELETE FROM user_profiles WHERE user_id = '00000000-0000-0000-0000-000000000005';
DELETE FROM user_profiles WHERE user_id = '00000000-0000-0000-0000-000000000006';
```

### **Paso 2: Ejecutar el Esquema Corregido**
1. En el **SQL Editor**, haz clic en **"New query"**
2. Copia TODO el contenido del archivo `supabase-schema.sql` (ya corregido)
3. Pégalo en el editor
4. Haz clic en **"Run"**

### **Paso 3: Verificar que Funciona**
Ejecuta esta consulta para verificar:

```sql
-- Verificar que las tablas se crearon correctamente
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Deberías ver estas tablas:
- ✅ `user_profiles`
- ✅ `forum_posts`
- ✅ `forum_comments`
- ✅ `post_likes`
- ✅ `comment_likes`
- ✅ `user_connections`
- ✅ `user_messages`
- ✅ `post_bookmarks`

---

## 🎯 **ALTERNATIVA RÁPIDA**

Si quieres una solución más rápida, puedes ejecutar solo la parte del esquema sin los datos de ejemplo:

### **Script SQL Limpio (Solo Estructura)**

```sql
-- Tabla para perfiles de usuario
CREATE TABLE user_profiles (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  linkedin TEXT,
  twitter TEXT,
  skills TEXT[],
  interests TEXT[],
  location TEXT,
  availability TEXT DEFAULT 'available',
  community TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Users can view their own profile." ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile." ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can view other profiles." ON user_profiles FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert their own profile." ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Función para crear un perfil de usuario automáticamente al registrarse
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función handle_new_user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Tabla para posts del foro
CREATE TABLE forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  community TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view posts." ON forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts." ON forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts." ON forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts." ON forum_posts FOR DELETE USING (auth.uid() = user_id);

-- Tabla para comentarios en posts
CREATE TABLE forum_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view comments." ON forum_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments." ON forum_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments." ON forum_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments." ON forum_comments FOR DELETE USING (auth.uid() = user_id);

-- Tabla para likes en posts
CREATE TABLE post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (post_id, user_id)
);

ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view post likes." ON post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like posts." ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike posts." ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- Tabla para likes en comentarios
CREATE TABLE comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID REFERENCES public.forum_comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (comment_id, user_id)
);

ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view comment likes." ON comment_likes FOR SELECT USING (true);
CREATE POLICY "Users can like comments." ON comment_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike comments." ON comment_likes FOR DELETE USING (auth.uid() = user_id);

-- Tabla para conexiones entre usuarios
CREATE TABLE user_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (sender_id, receiver_id)
);

ALTER TABLE user_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view their connections." ON user_connections FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Authenticated users can create connections." ON user_connections FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their received connection requests." ON user_connections FOR UPDATE USING (auth.uid() = receiver_id);
CREATE POLICY "Users can delete their connections." ON user_connections FOR DELETE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Tabla para mensajes privados
CREATE TABLE user_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their messages." ON user_messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages." ON user_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can mark their received messages as read." ON user_messages FOR UPDATE USING (auth.uid() = receiver_id);
CREATE POLICY "Users can delete their messages." ON user_messages FOR DELETE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Tabla para posts guardados
CREATE TABLE post_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (post_id, user_id)
);

ALTER TABLE post_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookmarks" ON post_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks" ON post_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON post_bookmarks FOR DELETE USING (auth.uid() = user_id);
```

---

## 🧪 **VERIFICACIÓN FINAL**

Después de ejecutar el script corregido:

1. **Verifica las tablas**:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

2. **Prueba la conexión**:
   - Abre `test-supabase.html`
   - Haz clic en **"Ejecutar Todos los Tests"**
   - Verifica que todos pasen

3. **Prueba la autenticación**:
   - Ve a `usuario.html`
   - Haz clic en **"Continuar con Google"**
   - Si funciona, ¡está listo!

---

## 🎉 **RESULTADO ESPERADO**

Después de seguir estos pasos:
- ✅ Base de datos configurada sin errores
- ✅ Tablas creadas correctamente
- ✅ Políticas de seguridad activas
- ✅ Autenticación funcionando
- ✅ Foros interactivos listos
- ✅ Directorio de usuarios funcional

**¡Tu proyecto EmprendeIA estará completamente conectado con Supabase!** 🚀
