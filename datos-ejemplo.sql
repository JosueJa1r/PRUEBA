-- 📝 DATOS DE EJEMPLO PARA EMPRENDEIA
-- ⚠️ IMPORTANTE: Este script solo debe ejecutarse DESPUÉS de que los usuarios se hayan registrado
-- a través de la autenticación de Supabase.

-- Este script crea datos de ejemplo para testing y desarrollo.
-- Los usuarios reales se crearán automáticamente cuando se registren.

-- 🚀 CÓMO USAR ESTE SCRIPT:
-- 1. Primero ejecuta supabase-schema.sql (sin errores)
-- 2. Registra algunos usuarios a través de la aplicación
-- 3. Luego ejecuta este script para agregar datos de ejemplo

-- 📋 PASOS PARA AGREGAR DATOS DE EJEMPLO:

-- Paso 1: Crear posts de ejemplo (sin usuarios específicos)
INSERT INTO forum_posts (user_id, community, category, title, content, tags) VALUES
    (auth.uid(), 'creadoras', 'general', '🚀 Mi nueva startup de tecnología sostenible', 'Hola chicas! Estoy desarrollando una plataforma que conecta a mujeres emprendedoras con inversores de impacto. ¿Alguien tiene experiencia en este sector?', ARRAY['startup', 'sostenibilidad', 'fintech']),
    (auth.uid(), 'creadoras', 'startups', '💡 ¿Cómo validar una idea de negocio sin inversión inicial?', 'Estoy en la fase inicial de mi emprendimiento y necesito consejos sobre validación de mercado sin gastar mucho dinero.', ARRAY['validación', 'mercado', 'inversión']),
    (auth.uid(), 'innovadores', 'tech', '🚀 Mi startup de IA para educación personalizada', 'Desarrollando una plataforma que usa IA para crear planes de estudio personalizados. ¿Alguien quiere colaborar?', ARRAY['IA', 'educación', 'startup']),
    (auth.uid(), 'innovadores', 'ai', '💡 ¿Cómo validar una idea tech sin código?', 'Tengo una idea para una app pero no sé programar. ¿Cuáles son las mejores herramientas no-code?', ARRAY['nocode', 'app', 'validación']),
    (auth.uid(), 'legado', 'experiencia', '🏢 Mi transición de ejecutivo a emprendedor', 'Después de 20 años en corporaciones, decidí emprender. Comparto mi experiencia y busco consejos de otros que hayan hecho esta transición.', ARRAY['transición', 'ejecutivo', 'emprendimiento']),
    (auth.uid(), 'legado', 'transicion', '💡 ¿Cómo adaptar mi experiencia a la era digital?', 'Tengo décadas de experiencia en ventas tradicionales, pero necesito adaptarme al mundo digital. ¿Por dónde empiezo?', ARRAY['digital', 'ventas', 'adaptación']);

-- Paso 2: Crear comentarios de ejemplo
-- NOTA: Estos comentarios se crearán cuando los usuarios interactúen con los posts

-- Paso 3: Crear conexiones de ejemplo
-- NOTA: Las conexiones se crearán cuando los usuarios se conecten entre sí

-- 📊 ESTADÍSTICAS DE EJEMPLO:
-- Una vez que tengas usuarios registrados, puedes ejecutar consultas como:

-- Ver todos los usuarios por comunidad:
-- SELECT community, COUNT(*) as total_users FROM user_profiles GROUP BY community;

-- Ver posts más populares:
-- SELECT title, likes_count, comments_count FROM forum_posts ORDER BY likes_count DESC LIMIT 5;

-- Ver usuarios más activos:
-- SELECT name, COUNT(*) as total_posts FROM user_profiles 
-- JOIN forum_posts ON user_profiles.user_id = forum_posts.user_id 
-- GROUP BY name ORDER BY total_posts DESC LIMIT 5;

-- 🎯 PRÓXIMOS PASOS:
-- 1. Ejecuta el esquema principal (supabase-schema.sql)
-- 2. Prueba la autenticación en usuario.html
-- 3. Crea algunos posts en los foros
-- 4. Prueba las funcionalidades de interacción
-- 5. Si necesitas datos de ejemplo específicos, ejecuta este script

-- ✅ VERIFICACIÓN:
-- Para verificar que todo funciona:
-- SELECT 'Tablas creadas correctamente' as status;
-- SELECT COUNT(*) as total_tables FROM information_schema.tables WHERE table_schema = 'public';
