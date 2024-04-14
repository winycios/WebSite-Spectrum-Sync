import React, { useState } from 'react';
import axios from 'axios';

function FormularioCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/usuarios/criar', {
        nome: nome,
        email: email,
        senha: senha
      });

      setMensagem('Usuário criado com sucesso!');
      console.log('Usuário criado com sucesso:', response);
    } catch (error) {
      setMensagem('Erro ao criar usuário. Por favor, tente novamente.');
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          minLength="3"
          maxLength="10"
          placeholder="Nome"
          required
        />
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
          minLength="6"
          maxLength="20"
          placeholder="Senha"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default FormularioCadastro;
