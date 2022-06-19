function PuxarValores(){
    let Input = document.getElementById("InputCep").value;
    if(Input != ''){
        let UrlFinal = `https://viacep.com.br/ws/${Input}/json`;
        console.log(UrlFinal);
        return UrlFinal;

    }
    else{
        alert('Digite Algo!')
    }
}
function PegarCep(url,callback){
    fetch(url).then((res)=>{return res.json()}).then((dados)=>{
        let DadosLocal = [dados.localidade,dados.bairro,dados.logradouro,
        dados.complemento,dados.uf];
        console.log(DadosLocal)
        for(let i in DadosLocal){
            if(DadosLocal[i] == undefined)
                return alert("Digite um CEP válido!");
            else
                callback = PrintScreen(DadosLocal[4],DadosLocal[0],DadosLocal[1],DadosLocal[2],DadosLocal[3]);
        }
    })
}
function PrintScreen(Estado, Cidade, Bairro, Logradouro, Complemento){
    let Container = document.querySelector(".containerList");
    Container.innerHTML=`
    <ul class="containerLista">
        <li><span class='TextoClaro'>Estado: </span> ${Estado}</li>
        <li><span class='TextoClaro'>Cidade: </span> ${Cidade}</li>
        <li><span class='TextoClaro'>Bairro: </span>${Bairro}</li>
        <li><span class='TextoClaro'>Logradouro: </span>${Logradouro}</li>
        <li><span class='TextoClaro'>Complemento: </span> ${Complemento}</li>
    </ul>
    `
}
let InputClick = document.getElementById("InputCep");
InputClick.addEventListener('keypress', function (event) {
    if (event.keyCode !== 13) return;
    Click(PuxarValores, PegarCep)
});


function Click(PuxarValores, PegarCep){
    PegarCep(PuxarValores());
    document.getElementById("InputCep").value = '';
}