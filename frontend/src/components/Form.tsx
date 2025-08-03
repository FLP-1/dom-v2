
import React, { useState } from 'react';
import './Form.css';

const Form = ({ perfil, campos, onSubmit, titulo }) => {
  const [formData, setFormData] = useState({});

  const config = {
    EMPLOYER: { estilo: 'eficiente', layout: 'vertical' },
    EMPLOYEE: { estilo: 'simples', layout: 'vertical' },
    FAMILY: { estilo: 'acolhedor', layout: 'horizontal' }
  };

  const { estilo, layout } = config[perfil] || config.EMPLOYER;

  const handleChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={`form form-${estilo} form-${layout}`} onSubmit={handleSubmit}>
      {titulo && <h3 className="form-title">{titulo}</h3>}
      
      {campos.map((campo, index) => (
        <div key={index} className="form-group">
          <label className="form-label">{campo.label}</label>
          <input
            type={campo.tipo}
            className="form-input"
            placeholder={campo.placeholder}
            value={formData[campo.nome] || ''}
            onChange={(e) => handleChange(campo.nome, e.target.value)}
            required={campo.obrigatorio}
          />
        </div>
      ))}
      
      <button type="submit" className="form-submit">
        Enviar
      </button>
    </form>
  );
};

export default Form;
    