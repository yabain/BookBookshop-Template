
function addProducts(productsID,set=false,quantity=1)
{
    if(!productsID) return;
    console.log("productsID ",productsID)
    productsID.forEach((productID)=>{
        let product = livresData.find((product)=>product.idProduit==productID);
        if(!product) return 0;
        if(quantity>0) product.checked=true;
        if(set) product.quantity=quantity;
        else product.quantity=product.quantity+quantity;
        
    })
}

function getCategoryByProductID(productID)
{
    let product = livresData.find((product)=>product.idProduit==productID);
    if(!product) return 0;
    return product.idCategory;
}

function getProductPrice(productID,quantity)
{
    let product =livresData.find((product)=>product.idProduit==productID);
    if(!product) return 0; 
    return quantity*product.prix;
}

function getProductQuantity(productID)
{
    let product =livresData.find((product)=>product.idProduit==productID);
    if(!product) return 0; 
    return product.quantity;
}

function deleteProduct(productID)
{

}

function initCategorySelectOption()
{
    let cats=new Map();
    for(const cat of livresData)
    {
        if(!cats.has(cat.idCategory)) cats.set(cat.idCategory,cat.labelCategory);
    }
    $("#classInputSelect").append(Array.from(cats.keys()).map((id)=> `<option value="${id}">${cats.get(id)}</option>`).join(""));
}

function selectCategory(idCategory)
{
    return livresData.filter((livre)=>livre.idCategory==idCategory).map((livre)=>{
        return {
            name:livre.nomProduit,
            value:livre.idProduit,
            checked:livre.checked
        } 
    })
}


function showProduct()
{

}

function getProducts()
{
    return livresData.filter((livre)=> livre.checked==true && livre.quantity>0)
}

function computeCartPrice()
{
    return livresData.map((livre)=>livre.quantity*livre.prix).reduce((sum,curr)=>sum+curr)
}