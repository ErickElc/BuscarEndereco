// let botao = document.getElementById("Submit");
function PuxarValores(){
    let Input = document.getElementById("InputCep").value;
    if(Input > 9999999){
        let UrlFinal = `https://viacep.com.br/ws/${Input}/json`;
        return UrlFinal;
    }
    else{
        return false;
    }
}
function PegarCep(url,callback){
    if(url == false){
        alert("Cep Invalido");
        return '';
    }
    else{
        fetch(url).then((res)=>{return res.json()}).then((dados)=>{
            let DadosLocal = [dados.localidade,dados.bairro,dados.logradouro,
            dados.complemento,dados.uf];
            for(let i in DadosLocal){
                if(DadosLocal[i] == undefined)
                    return alert("Error")
                else
                    callback = PrintScreen(DadosLocal[4],DadosLocal[0],DadosLocal[1],DadosLocal[2],DadosLocal[3]);
            }
         })
     }
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
function Click(PuxarValores, PegarCep){
    PegarCep(PuxarValores());
    document.getElementById("InputCep").value = '';
}