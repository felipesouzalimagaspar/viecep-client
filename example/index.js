import * as ViaCEP from './../js/viacep-client.js';
const inputCep = document.querySelector('#input-cep')
inputCep.addEventListener('keyup', function () { ViaCEP.searchCEP(inputCep, [
    new ViaCEP.Mapper('input-street', 'logradouro', 'text'),
    new ViaCEP.Mapper('input-neighborhood', 'bairro', 'text'),
    new ViaCEP.Mapper('input-city', 'localidade', 'text'),
    new ViaCEP.Mapper('input-uf', 'uf', 'text')
]) })