let InputClick = document.getElementById("InputCep");

// Iniciar Sistema;

function Click(PuxarValores, PegarCep){
    PegarCep(PuxarValores());
    document.getElementById("InputCep").value = ''; // Limpar o input, quando ele for clicado;
}
// Enviar o dados quando clicar na tecla "ENTER";
InputClick.addEventListener('keypress', function (event) {
    if (event.keyCode !== 13) return;
    Click(PuxarValores, PegarCep)
});

// Puxar Valores do Input!;

function PuxarValores(){
    let Input = document.getElementById("InputCep").value;
    let error = false;
    if(Input != ''){
        if(Input.length <= 8){
            error = true;
            alert("Texto Inválido");
            return error;
        }
        else{
            let UrlFinal = `https://viacep.com.br/ws/${Input}/json`;
            return UrlFinal;
        }
    }
    else{
        alert('Digite Algo!');
    }
}
// Mandar o valor do input para a api(ViaCEP), e retornar os dados;

function PegarCep(url,callback){
    if(url == true){
        return '';
    }
    fetch(url).then((res)=>{return res.json()}).then((dados)=>{
        let DadosLocal = [dados.localidade,dados.bairro,dados.logradouro,
        dados.complemento,dados.uf]; /// ARRAY COM OS DADOS;
        for(let i in DadosLocal){ /// Validando os DADOS;
            if(DadosLocal[i] == undefined)
                return alert("Digite um CEP válido!");
            else
                callback = PrintScreen(DadosLocal[4],DadosLocal[0],DadosLocal[1],DadosLocal[2],DadosLocal[3]); // Chamando a função de escrever na tela;
        }
    })
}
// Escrever os dados na tela;

function PrintScreen(Estado, Cidade, Bairro, Logradouro, Complemento){
    let Container = document.querySelector(".containerList");
    Container.innerHTML=`
    <ul class="containerLista">
        <li><span class='TextoClaro'>Estado: </span> ${Estado}</li>
        <li><span class='TextoClaro'>Cidade: </span> ${Cidade}</li>
        <li><span class='TextoClaro'>Bairro: </span>${Bairro}</li>
        <li><span class='TextoClaro'>Logradouro: </span>${Logradouro}</li>
        <li><span class='TextoClaro'>Complemento: </span> ${Complemento}</li>
    </ul>`
}
/// Máscara Do Input;

function mascara(o,f){
    v_obj = o;
    v_fun = f;
    setTimeout("execmascara()",1);
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value);
}
function mtel(v){
    v = v.replace(/\D/g,""); //Remove tudo o que não é dígito
    if(v.length >= 7)
        v = v.replace(/(\d)(\d{3})$/,"$1-$2");    //Coloca hífen entre o quinto e o sexto dígitos
    return v;
}
function id( el ){
    return document.getElementById( el );
}
window.onload = function(){
    id('InputCep').onkeyup = function(){
        mascara( this, mtel );
    }
}