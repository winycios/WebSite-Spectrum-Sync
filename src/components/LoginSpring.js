import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/usuarios/login', {
        email: email,
        senha: senha
      });

      setMensagem('Login bem sucedido!');
      console.log('Usuário logado:', response.data);
      // Aqui você pode redirecionar o usuário para a próxima página, por exemplo:
      // history.push('/dashboard');
    } catch (error) {
      setMensagem('Erro ao fazer login. Por favor, verifique suas credenciais.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default LoginForm;
