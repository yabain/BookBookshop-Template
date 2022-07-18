const dataFormStep={};
let phoneInputWhatsAppTel = null;
let phoneInputWhatsAppTelDestinataire = null;
let dataTable=null;
let formData=new FormData()
let livresData=[
    {
        idCategory:1,
        labelCategory:"1er",
        idProduit:1,
        nomProduit:"Math",
        prix:1000,
        quantity:0,
        lien:"",
        checked:false,
        reduction:0,
    },
    {
        idCategory:1,
        labelCategory:"1er",
        idProduit:2,
        nomProduit:"Physique",
        prix:1500,
        quantity:0,
        checked:true,
        lien:"",
        reduction:0,
    },
    {
        idCategory:2,
        labelCategory:"Tle",
        idProduit:3,
        nomProduit:"Anglais",
        prix:2000,
        checked:true,
        quantity:0,
        lien:"",
        reduction:0,
    },
    {
        idCategory:2,
        labelCategory:"Tle",
        idProduit:4,
        nomProduit:"Phylo",
        checked:true,
        prix:3000,
        quantity:0,
        lien:"",
        reduction:0,
    },
    {
        idCategory:3,
        labelCategory:"6er",
        idProduit:5,
        nomProduit:"Math",
        checked:true,
        quantity:0,
        prix:1000,
        lien:"",
        reduction:0,
    },
];

function validFormStep1()
{
    // if(phoneInputWhatsAppTel.getNumber()=="")  
    let form =document.querySelector('#formStep1');
    if(form.checkValidity() === false)
    {
        form.classList.add("was-validated");
        return false;
    }
    dataFormStep["1"]={
        civilite:$("#civilite").val(),
        telWhatsaps:phoneInputWhatsAppTel.getNumber(),
        inputNom:$("#inputNom").val(),
        inputPrenom:$("#inputPrenom").val(),
        isAssociation: $("#isAssociation").is(':checked') ? true:false,
    }

    if( $("#isAssociation").is(':checked') ) dataFormStep["1"]["inputAssosiation"] = $("#inputAssosiation").val(); 
    return true;
}

function validFormStep3()
{
    let form =document.querySelector('#formStep3');
    if(form.checkValidity() === false)
    {
        form.classList.add("was-validated");
        return false;
    }
    dataFormStep["3"]={
        localisation:$("#inputLocalisation").val(),
        isUserAsDestinataire: $("#isUserDestination").is(':checked') ? true:false,
    }

    if( $("#isUserDestination").is(':checked') ) 
    {
        dataFormStep["3"]["telWhatsapsDestinataire"] = phoneInputWhatsAppTelDestinataire.getNumber(); 
        dataFormStep["3"]["inputNomDestinataire"] = $("#inputNomDestinataire").val(); 
    }
    return true;
}


function updateQuantityProduct(target)
{
    let productID=parseInt($(target).data("product_id"));
    let quantity=parseInt($(target).val());
    addProducts([productID],true,quantity);
    if(quantity==0)
    {
        let product =livresData.find((product)=>product.idProduit==productID);
        if(product) product.checked=false;
    }
    updateDataTable();
    updateDataSelection(parseInt($(target).data("category_id")));
    $("#montal_produit").text(computeCartPrice());
}
function updateDataTable()
{
    $('#tableLivres').DataTable().clear();
    $('#tableLivres').DataTable().rows.add( getProducts() ).draw();
}

function updateDataSelection(idCategory)
{
    $("#livreInputSelect").multiselect("loadOptions",selectCategory(idCategory));
}

jQuery(window)
.load(function () {
    var retina = window.devicePixelRatio > 1 ? true : false;
    if (retina) {
        var retinaEl = jQuery("#logo img");
        var retinaLogoW = retinaEl.width();
        var retinaLogoH = retinaEl.height();
        retinaEl.attr("src", "images/bbs/bbs_logo.png").width(retinaLogoW).height(retinaLogoH)
    }

    const phoneInputField = document.querySelector("#telWhatsaps");
    phoneInputWhatsAppTel = window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        preferredCountries: ["cm","fr"]
    });

    phoneInputWhatsAppTelDestinataire = window.intlTelInput(
        document.querySelector("#telWhatsapsDestinataire")
        , {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        preferredCountries: ["cm","fr"]
    });

    $('#landing-bbs').steps({   
        onFinish: function () { alert('complete'); },
        onChange:(e,currentIndex,priorIndex)=>{
            // console.log("Curr Index: ",currentIndex,'Previous Index ',priorIndex,"Event ",e);
            if(currentIndex==1) return validFormStep1();
            if(currentIndex==3) return validFormStep3();
            return true;
        }
    });
    
    $("#inputAssosiationGroup").hide( );
    $("#isAssociation").click(function (e){
        if( $(this).is(':checked') ) 
        {
            $("#inputAssosiationGroup").show( "fast");
            $("#inputAssosiation").attr("required","true");
        }
        else
        {
            $("#inputAssosiation").attr("required","false");
            $("#inputAssosiationGroup").hide( 700 );
        }
    })


    initCategorySelectOption();
    $("#montal_produit").text(computeCartPrice());

    $("#infosDestinataire").hide( );
    $("#isUserDestination").click(function (e){
        if( !($(this).is(':checked')) ) 
        {
            $("#infosDestinataire").show( "fast");
            $("#inputNomDestinataire").attr("required","true");
            $("#telWhatsapsDestinataire").attr("required","true");
        }
        else
        {
            $("#infosDestinataire").hide( 700 );
            $("#inputNomDestinataire").attr("required","false");
            $("#telWhatsapsDestinataire").attr("required","false");
        }
    })
    
    
    $("#userZoneLivraisonDestination").hide( );
    $("#isUserZoneLivraisonDestination").click(function (e){
        if( ($(this).is(':checked')) ) 
        {
            $("#userZoneLivraisonDestination").show( "fast");
        }
        else
        {
            $("#userZoneLivraisonDestination").hide( 700 );
        }
    })


    $("#livreInputSelect").multiselect({
        search: true,
        selectAll:true,
        buttonClass: 'custom-select',
        texts: {
            placeholder:"Selectionnez vos livres",
            search:"Recherchez un livre",
            searchNoResult:"Aucun livre de ce nom trouvé",
            selectAll:"Tout sélectionner"
        },
        onOptionClick: function(element, option) {
            // console.log('Change event invoked!',element,checked);
            // if( !($(option).is(':checked')) ) {
            //     // console.log('Change event invoked!',element, $(option).val());
            //     let product = livresData.find((product)=>product.idProduit== $(option).val());
            //     if(!product) return 0;
            //     product.quantity=0;
            //     product.checked=false;
            //     updateDataTable();
            // }
        }
    })
       
    $("#addProducts-btn").on("click",()=>{
        let productsID=$("#livreInputSelect").multiselect().val();
        if(!productsID) return;
        addProducts(productsID.map((id)=>parseInt(id)))
        updateDataTable();
        $("#montal_produit").text(computeCartPrice());

    })
    $("#classInputSelect").on("change",function (){
        $("#livreInputSelect").multiselect("loadOptions",selectCategory(parseInt($(this).val())));
    })

    //Initialisation des villes
    let locationCommune=$("#inputLocalisationCommune");
    let locationVille=$("#inputLocalisationVille");
    let localisationVilleChosen = locationVille.chosen({
        width: "100%"
    });
    Array.from(dataVille.keys()).forEach((ville)=>locationCommune.append(`<option>${ville}</option>`))
    locationCommune.chosen({
        width: "100%"
    });
    localisationVilleChosen.val(dataVille.get(locationCommune.val()));


    if(locationCommune.val())
    {
        if(dataVille.has(locationCommune.val()))
        {
            locationVille.empty();

            dataVille.get(locationCommune.val()).forEach((ville)=>locationVille.append(`<option>${ville}</option>`))
            localisationVilleChosen.trigger("chosen:updated");
        }
    }


    locationCommune.on("change",function(e){
        if(dataVille.has(locationCommune.val()))
        {
            locationVille.empty();

            dataVille.get(locationCommune.val()).forEach((ville)=>locationVille.append(`<option>${ville}</option>`))
            localisationVilleChosen.trigger("chosen:updated");
        }
    })
    
    // $("#inputLocalisation_chosen").css("width","100%");


    dataTable=$('#tableLivres').DataTable( {
        data:getProducts(),
        searching: false,
        columns:[
            {
                data: "labelCategory",
                title:"Classe"
            },
            {
                data:"nomProduit",
                title:"Titre (Matière)"
            },
            {
                data:"idProduit",
                title:"Quantité",
                render:(data,type)=>{
                    if(type=="display")
                    {
                        return '<input class="input-update-product-quantity" value="'+getProductQuantity(data)+'" type="number" min="0" max="50" step="1" data-category_id='+getCategoryByProductID(data)+' data-product_id='+data+' onchange="updateQuantityProduct(this)"/>';
                    }
                    return data;
                }
            },
            {
                data:"idProduit",
                title:"Prix total",
                render:(data,type)=>{
                    if(type=="display")
                    {
                        return getProductPrice(data,getProductQuantity(data))
                    }
                    return data;
                }
            },
            
        ]
    } );


    
});
