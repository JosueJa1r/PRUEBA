// Configuración de Supabase para EmprendeIA
class SupabaseConfig {
    constructor() {
        // 🔧 CONFIGURACIÓN DE SUPABASE - ACTUALIZA ESTOS VALORES
        // Ve a tu dashboard de Supabase > Settings > API para obtener estos valores
        
        // Cargar configuración desde localStorage si existe
        const storedConfig = this.loadStoredConfig();
        
        this.supabaseUrl = storedConfig?.SUPABASE?.URL || 
                          window.CONFIG?.SUPABASE?.URL || 
                          'https://tu-proyecto.supabase.co';
        
        this.supabaseAnonKey = storedConfig?.SUPABASE?.ANON_KEY || 
                              window.CONFIG?.SUPABASE?.ANON_KEY || 
                              'tu-clave-anonima-aqui';
        
        // Inicializar Supabase
        this.supabase = null;
        this.init();
    }

    loadStoredConfig() {
        try {
            const storedConfig = localStorage.getItem('emprendeia-config');
            if (storedConfig) {
                return JSON.parse(storedConfig);
            }
        } catch (error) {
            console.warn('⚠️ Error cargando configuración almacenada:', error);
        }
        return null;
    }

    init() {
        // Verificar si Supabase está disponible
        if (typeof supabase !== 'undefined') {
            this.supabase = supabase.createClient(this.supabaseUrl, this.supabaseAnonKey);
            console.log('✅ Supabase inicializado correctamente');
        } else {
            console.warn('⚠️ Supabase no está disponible. Usando modo simulado.');
            this.supabase = this.createMockSupabase();
        }
    }

    createMockSupabase() {
        // Mock de Supabase para desarrollo local
        return {
            auth: {
                signInWithOAuth: async (provider) => {
                    console.log(`🔐 Simulando login con ${provider}`);
                    return this.mockGoogleAuth();
                },
                signOut: async () => {
                    console.log('🚪 Simulando logout');
                    localStorage.removeItem('user');
                    return { error: null };
                },
                getUser: () => {
                    const user = localStorage.getItem('user');
                    return { data: { user: user ? JSON.parse(user) : null } };
                },
                onAuthStateChange: (callback) => {
                    // Simular cambios de estado de autenticación
                    const user = localStorage.getItem('user');
                    callback('SIGNED_IN', user ? JSON.parse(user) : null);
                    return { data: { subscription: { unsubscribe: () => {} } } };
                }
            },
            from: (table) => ({
                select: (columns = '*') => ({
                    eq: (column, value) => ({
                        single: async () => {
                            console.log(`📊 Mock query: SELECT ${columns} FROM ${table} WHERE ${column} = ${value}`);
                            return { data: null, error: null };
                        },
                        order: (column, options = {}) => ({
                            limit: (count) => ({
                                execute: async () => {
                                    console.log(`📊 Mock query: SELECT ${columns} FROM ${table} WHERE ${column} = ${value} ORDER BY ${column} LIMIT ${count}`);
                                    return { data: [], error: null };
                                }
                            })
                        })
                    })
                }),
                insert: (data) => ({
                    select: () => ({
                        single: async () => {
                            console.log(`📝 Mock insert: INSERT INTO ${table}`, data);
                            return { data: { ...data, id: Date.now() }, error: null };
                        }
                    })
                }),
                update: (data) => ({
                    eq: (column, value) => ({
                        select: () => ({
                            single: async () => {
                                console.log(`🔄 Mock update: UPDATE ${table} SET ... WHERE ${column} = ${value}`);
                                return { data: { ...data, id: value }, error: null };
                            }
                        })
                    })
                })
            })
        };
    }

    async mockGoogleAuth() {
        // Simular autenticación con Google
        const mockUser = {
            id: 'mock_user_' + Date.now(),
            email: 'usuario@emprendeia.com',
            name: 'Usuario EmprendeIA',
            avatar_url: 'IMG/placeholder-user.jpg',
            created_at: new Date().toISOString(),
            community: this.detectCommunity()
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return {
            data: { user: mockUser },
            error: null
        };
    }

    detectCommunity() {
        const path = window.location.pathname;
        if (path.includes('creadoras')) return 'creadoras';
        if (path.includes('innovadores')) return 'innovadores';
        if (path.includes('legado')) return 'legado';
        return 'general';
    }

    // Métodos de utilidad
    async signInWithGoogle() {
        try {
            const result = await this.supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/usuario.html'
                }
            });
            return result;
        } catch (error) {
            console.error('Error en autenticación:', error);
            return { error };
        }
    }

    async signOut() {
        try {
            const result = await this.supabase.auth.signOut();
            localStorage.removeItem('user');
            return result;
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            return { error };
        }
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    async getUserProfile(userId) {
        try {
            const result = await this.supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', userId)
                .single();
            return result;
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            return { data: null, error };
        }
    }

    async updateUserProfile(userId, profileData) {
        try {
            const result = await this.supabase
                .from('user_profiles')
                .update(profileData)
                .eq('user_id', userId)
                .select()
                .single();
            return result;
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            return { data: null, error };
        }
    }

    async createUserProfile(userId, profileData) {
        try {
            const result = await this.supabase
                .from('user_profiles')
                .insert({
                    user_id: userId,
                    ...profileData,
                    created_at: new Date().toISOString()
                })
                .select()
                .single();
            return result;
        } catch (error) {
            console.error('Error al crear perfil:', error);
            return { data: null, error };
        }
    }

    async getCommunityUsers(community) {
        try {
            const result = await this.supabase
                .from('user_profiles')
                .select('*')
                .eq('community', community)
                .order('created_at', { ascending: false })
                .limit(50);
            return result;
        } catch (error) {
            console.error('Error al obtener usuarios de la comunidad:', error);
            return { data: [], error };
        }
    }
}

// Instancia global
window.supabaseConfig = new SupabaseConfig();
