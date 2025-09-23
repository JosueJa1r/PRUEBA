// Estilos CSS para el Directorio de Usuarios
const userDirectoryStyles = `
    <style>
        /* Estilos del Directorio de Usuarios */
        .directory-header {
            background: white;
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid rgba(255,255,255,0.2);
        }

        .directory-title {
            text-align: center;
            margin-bottom: 25px;
        }

        .directory-title h2 {
            font-size: 28px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .directory-title p {
            color: #64748b;
            font-size: 16px;
            font-weight: 500;
        }

        .directory-stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
        }

        .stat-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 20px 25px;
            text-align: center;
            min-width: 120px;
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
            border-color: #cbd5e1;
        }

        .stat-card i {
            font-size: 24px;
            color: #3b82f6;
            margin-bottom: 8px;
        }

        .stat-number {
            display: block;
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 4px;
        }

        .stat-label {
            font-size: 14px;
            color: #64748b;
            font-weight: 600;
        }

        .directory-filters {
            background: white;
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid rgba(255,255,255,0.2);
        }

        .search-box {
            position: relative;
            margin-bottom: 20px;
        }

        .search-box i {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
            font-size: 16px;
            z-index: 2;
        }

        .search-box input {
            width: 100%;
            padding: 16px 20px 16px 50px;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            font-size: 16px;
            background: #f8fafc;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .search-box input:focus {
            outline: none;
            border-color: #3b82f6;
            background: white;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
            transform: translateY(-1px);
        }

        .filter-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .filter-btn {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 24px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #475569;
            position: relative;
            overflow: hidden;
        }

        .filter-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.5s ease;
        }

        .filter-btn:hover {
            background: #e2e8f0;
            border-color: #cbd5e1;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .filter-btn:hover::before {
            left: 100%;
        }

        .filter-btn.active {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border-color: #3b82f6;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .filter-btn.active:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .users-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .user-card {
            background: white;
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid rgba(255,255,255,0.2);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        .user-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .user-card:hover {
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            transform: translateY(-4px);
            border-color: rgba(59, 130, 246, 0.2);
        }

        .user-card:hover::before {
            opacity: 1;
        }

        .user-card-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        .user-card-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 16px;
            object-fit: cover;
            border: 3px solid #e2e8f0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .user-card:hover .user-card-avatar {
            border-color: #3b82f6;
            transform: scale(1.05);
        }

        .user-card-info {
            flex: 1;
        }

        .user-card-name {
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 4px;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .user-card-location {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .user-card-location i {
            color: #94a3b8;
        }

        .user-card-status {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
        }

        .status-indicator.available {
            background: #10b981;
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }

        .status-indicator.busy {
            background: #f59e0b;
            box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
        }

        .status-indicator.away {
            background: #6b7280;
            box-shadow: 0 0 8px rgba(107, 114, 128, 0.4);
        }

        .status-text {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
        }

        .user-card-body {
            margin-bottom: 20px;
        }

        .user-card-bio {
            color: #475569;
            line-height: 1.6;
            margin-bottom: 15px;
            font-size: 14px;
        }

        .user-card-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .skill-tag {
            background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
            color: #0369a1;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            border: 1px solid #bae6fd;
        }

        .more-skills {
            background: #f1f5f9;
            color: #64748b;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }

        .user-card-footer {
            display: flex;
            gap: 12px;
        }

        .btn {
            flex: 1;
            padding: 12px 16px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
        }

        .btn:hover::before {
            left: 100%;
        }

        .btn-outline {
            background: #f8fafc;
            color: #64748b;
            border-color: #e2e8f0;
        }

        .btn-outline:hover {
            background: #e2e8f0;
            border-color: #cbd5e1;
            color: #475569;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .btn-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border-color: #3b82f6;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
        }

        .btn-primary:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            border-color: #2563eb;
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .no-users {
            text-align: center;
            padding: 60px 20px;
            color: #64748b;
        }

        .no-users i {
            font-size: 48px;
            margin-bottom: 20px;
            opacity: 0.5;
        }

        .no-users h3 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #475569;
        }

        .no-users p {
            font-size: 16px;
        }

        /* Estilos del Modal de Mensaje */
        .message-modal {
            max-width: 500px;
        }

        .message-recipient {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: #f8fafc;
            border-radius: 12px;
            margin-bottom: 20px;
        }

        .recipient-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #e2e8f0;
        }

        .recipient-info h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
        }

        .recipient-info p {
            margin: 0;
            font-size: 14px;
            color: #64748b;
        }

        /* Estilos de Loading */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }

        .loading-spinner {
            text-align: center;
            color: white;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .directory-header {
                padding: 20px;
            }

            .directory-title h2 {
                font-size: 24px;
            }

            .directory-stats {
                gap: 20px;
            }

            .stat-card {
                padding: 16px 20px;
                min-width: 100px;
            }

            .stat-number {
                font-size: 20px;
            }

            .users-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .user-card {
                padding: 20px;
            }

            .user-card-header {
                margin-bottom: 16px;
            }

            .user-card-avatar {
                width: 50px;
                height: 50px;
            }

            .user-card-name {
                font-size: 16px;
            }

            .user-card-footer {
                flex-direction: column;
            }

            .btn {
                padding: 14px 16px;
            }

            .filter-buttons {
                gap: 8px;
            }

            .filter-btn {
                padding: 10px 16px;
                font-size: 13px;
            }
        }

        @media (max-width: 480px) {
            .directory-header {
                padding: 15px;
            }

            .directory-stats {
                flex-direction: column;
                gap: 12px;
            }

            .stat-card {
                padding: 12px 16px;
            }

            .user-card {
                padding: 16px;
            }

            .user-card-avatar {
                width: 45px;
                height: 45px;
            }

            .user-card-name {
                font-size: 15px;
            }

            .user-card-bio {
                font-size: 13px;
            }
        }
    </style>
`;

// Agregar estilos al documento
document.head.insertAdjacentHTML('beforeend', userDirectoryStyles);
