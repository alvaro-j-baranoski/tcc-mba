import React, { useState } from 'react';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Por favor, preencha todos os campos');
            return;
        }
        
        // Aqui você pode adicionar a lógica de autenticação
        console.log('Login com:', { email, password });
        setError('');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>PGRFacil</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-btn">
                        Entrar
                    </button>
                </form>

                <p className="signup-link">
                    Não possui conta? <a href="/signup">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
}