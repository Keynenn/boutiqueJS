<!doctype html>
<html lang="fr-FR">

    <head>
        <meta charset="utf-8">
        <title>Catalogue</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="style/style.css">
        <link rel="icon" type="image/jpg" href="style/images/favicon.jpg">
        <script defer src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script defer src="scripts/main.js"></script>
    </head>

    <body>

        <!--   
            <?php 
                $path = "data";
                $dossier = opendir($path);
                $i=1;
                $choixCatalog ="<select id='quelCatalog' class='form-control selectqt center-block' name='q'>";
                while (($file = readdir($dossier)) != false) {
                    if ($file != "." && $file != ".." && strtolower(substr($file, strrpos($file, '.') + 1)) == 'json')
                    {
                        $choixCatalog .= "<option value='". $i ."'>". $file ."</option>";
                        $i++;
                    }
                }
                closedir($dossier);
                $choixCatalog .="</select>";
                echo($choixCatalog);
            ?> 
        -->
        <div class="container-fluid">
            <ul id='Arts'><div id="mesArticles" class="catalogue"> </div></ul>
            <div class="monPanier">
                <input type="text" id="recherche" onkeyup="trie()" placeholder="Chercher un article">
                <div class="prixTotal">Total: <span id="total"></span></div>
                <div id="resumePanier" class="articlePanier"></div>
                <div id='alert-box'></div>
            </div>
        </div>

        <script>
                function trie() {
                    var input, filter, ul, li, a, i, txtValue;
                    input = document.getElementById('recherche');
                    filter = input.value.toUpperCase();
                    ul = document.getElementById("Arts");
                    li = ul.getElementsByTagName('li');
                    console.log(li);
                    for (i = 0; i < li.length; i++) {
                        a = li[i].getElementsByTagName("h1")[0];
                        txtValue = a.textContent || a.innerText;
                        console.log(txtValue);
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            li[i].style.display = "";
                        } else {
                            li[i].style.display = "none";
                        }
                    }
                }
        </script>

    </body>

</html>
