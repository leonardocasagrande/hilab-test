import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import common_pt_BR from "./translations/pt-BR/common.json";
import common_en from "./translations/en/common.json";

//Configura o i18next para tradução das chaves, e o detector de linguagem do navegador.
i18next.use(LanguageDetector).init({
  interpolation: { escapeValue: false },
  detection: {
    order: ['navigator']
  },
  resources: {
    pt: {
      common: common_pt_BR
    },
    en: {
      common: common_en
    }
  },
  fallbackLng: 'pt'
});

ReactDOM.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();