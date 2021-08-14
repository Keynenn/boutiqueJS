jQuery(function () {
    'use strict';
    
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();

        if ('atob' in window) {
            cvalue = btoa(cvalue);
        }

        document.cookie = cname + "=" + cvalue + "; " + expires + ';path=/';
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c[0] == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                if ('atob' in window) {
                    return atob(c.substring(name.length,c.length));
                }
                else {
                    return c.substring(name.length,c.length);
                }
            }
        }
        return false;
    }


    function saveCart(cartArticles, choixCatalogue) {
        setCookie('cartArticles', JSON.stringify(cartArticles), 5);
        setCookie('choixCatalogue', JSON.stringify(choixCatalogue), 5);
        setCookie('err', JSON.stringify(err), 5);
    }


        var cartArticles;
        cartArticles = getCookie('cartArticles') ? JSON.parse(getCookie('cartArticles')) : [];

        var err;
        err = getCookie('err') ? JSON.parse(getCookie('err')) : [];

        var choixCatalogue;
        choixCatalogue = getCookie('choixCatalogue') ? JSON.parse(getCookie('choixCatalogue')) : [];
        

        var total;
        var items = '';
        var monnaie =' po';

            $( "#quelCatalog" ).change(function() {
                choixCatalogue.set({
                    id : parseInt($('#quelCatalog').val()),      
                    name : parseInt($('#quelCatalog').val())
                });
                console.log(cartArticles);
                saveCart(cartArticles, choixCatalogue);
                location.reload();
            });

            /* Catalogue */

            function readTextFile(file, callback) {
                var rawFile = new XMLHttpRequest();
                rawFile.overrideMimeType("application/json");
                rawFile.open("GET", file, true);
                rawFile.onreadystatechange = function() {
                    if (rawFile.readyState === 4 && rawFile.status == "200") {
                        callback(rawFile.responseText);
                    }
                }
                rawFile.send(null);
            }

            $( document ).ready(function() {

                $("#quelCatalog").val(choixCatalogue.id); 

                choixCatalogue = getCookie('choixCatalogue') ? JSON.parse(getCookie('choixCatalogue')) : [];

                var articles = '';
                readTextFile("data/mount.json", function(text){
                    var data = JSON.parse(text);
                    $.each(data.article, function(i, item) {
                        articles += "<li><article class='product'>\
                        <h1 class='text-center titreArt'>"+ item.name +"<br><p class='descri'>"+ item.description +"</p></h1>\
                        <a href='' title='"+ item.name +"' class='text-center'>\
                        <img src='"+ item.image +"' class='center-block imageSize' alt='"+ item.name +"'></a>\
                        <p class='price text-center'>"+ Number(item.price).toLocaleString('en') + monnaie +"<small>"+ Number(item.price).toLocaleString('en') + monnaie +"</small></p>\
                        <select id='qt" + i + "' class='form-control selectqt center-block' name='q'><option value='1'>1</option><option value='2'>2</option>\
                        <option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option>\
                        <option value='8'>8</option><option value='9'>9</option>\
                        </select><button type='button' class='add-to-cart btn btn-danger center-block' data-id=\"" + i +"\" data-name=\""+ item.name +"\" data-price=\""+ item.price +"\" data-img=\""+ item.imagemini +"\" data-description=\""+ item.description +"\" >\
                        <i class='fa fa-gift'></i></button></article></li>";
                    });
                    $('#mesArticles').prepend(articles);
                });

            });





        err.forEach(function(v) {
            $('#alert-box').prepend("<div class='alert alert-danger alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + v.title + "</strong>" + v.description +"</div>");
        });

        cartArticles.forEach(function(v) {
            items += "<div class='row' id='art'>\
                    <div class='col-xs-3'>\
                        <img src='"+ v.img +"' class='center'></img>\
                    </div>\
                    <div class='col-xs-9'>\
                        <div class='row'>\
                            <div class='col-xs-8'><div class='mini-box titre'>"+ v.name +"</div></div>\
                            <div class='col-xs-4'><div class='mini-box prix'>"+ Number(v.price).toLocaleString('en') + monnaie +"</div></div>\
                            <div class='row'>\
                                <div class='col-xs-3 descri'>"+ v.qt +"</div>"
                                if(v.qt != 1){
                                    items += "<div class='col-xs-3'><span data-id='"+ v.id +"' class='btn btn-warning btn-sm qt-minus '>–</span></div>"
                                }
                                if(v.qt != 9){
                                    items += "<div class='col-xs-3'><span data-id='"+ v.id +"' class='btn btn-success btn-sm qt-plus'>+</span></div>"
                                }
                                items += "<div class='col-xs-3'><button data-id='"+ v.id +"' class='btn btn-danger btn-sm delete-item'><i class='fa fa-trash-o'></i></button></div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <hr>"
            
        });

        $('#resumePanier').prepend(items);

        total = 0;
        cartArticles.forEach(function(v) {
            var itemPrice = v.price.replace(',', '.');
            total += itemPrice * v.qt;
        });
        $('#total').prepend(Number(total).toLocaleString('en') + monnaie);

        $('#cart-tablebody').empty().html(items);

        $('#mesArticles').on("click", "button", function(e){
            var $this = $(this);
            var id = $this.attr('data-id');
            var name = $this.attr('data-name');
            var price = $this.attr('data-price');
            var img = $this.attr('data-img');
            var description = $this.attr('data-description');
            var qt = parseInt($('#qt'+id).val());
            addCart(id, name, price, qt, img, description);
        });


        function cartEmptyToggle() {
            $('.col-xs-3').hide();
        }

        function addCart(id, name, price, qt, img, description) {
            var newArticle = true;
            cartArticles.forEach(function(v) {
                if (v.id == id){
                    newArticle = false;
                    if(v.qt + qt < 10) {
                        v.qt += qt;
                    }else{
                        err.push({
                            id: id,
                            title: "Attention !</br>",
                            description : "Vous ne pouvez pas avoir plus de 9 unitées d'un article."
                        });
                    }
                }
            });

            if (newArticle) {
                cartArticles.push({
                    id: id,
                    name: name,
                    price: price,
                    qt: qt,
                    img : img,
                    description : description
                });
            }
            saveCart(cartArticles, choixCatalogue);
            location.reload();
        } 

        // qt +
        $('.qt-plus').on('click', function() {
            var $this = $(this);
            var id = $this.attr('data-id');
            cartArticles.forEach(function(v) {
                if (v.id == id && v.qt < 9) {
                    v.qt += 1;
                }else if(v.id == id){
                    err.push({
                        id: id,
                        title: "Attention !</br>",
                        description : "Vous ne pouvez pas avoir plus de 9 unitées d'un article."
                    });
                }
            });
            saveCart(cartArticles, choixCatalogue);
            location.reload();
        });

        // qt -
        $('.qt-minus').click(function() {
            var $this = $(this);
            var id = $this.attr('data-id');
            cartArticles.forEach(function(v) {
                if (v.id == id && v.qt > 1) {
                    v.qt -= 1;
                }else if(v.id == id){
                    err.push({
                        id: id,
                        title: "Attention !</br>",
                        description : "Vous ne pouvez pas avoir moin d'un article."
                    });
                }
            });
            saveCart(cartArticles, choixCatalogue);
            location.reload();
        });

        $('.delete-item').click(function() {
            var $this = $(this);
            var id = $this.attr('data-id');
            var arrayId = 0;

            $this.parent().parent().hide(600);
            $('#'+ id).remove();

            cartArticles.forEach(function(v) {

                if (v.id == id) {
                    cartArticles.splice(arrayId, 1);

                    return false;
                }
                arrayId++;
            });
            saveCart(cartArticles, choixCatalogue);
            location.reload();
        });
        
    }
);
