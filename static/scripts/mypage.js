$(document).ready(() => {
    //유저 정보 표시
    show_user();
    //즐겨찾기 목록 표시
    // show_favorite();
})

function show_user(){
    $('.user').empty();
        $.ajax({
            type: 'GET',
            url: '/my/user', //유저 정보 가져올 url 필요
            data: {},
            success: function (response) {
                console.log(response)
                let userInfo = response['user_data']
                let name = userInfo['user_id']
                let email = userInfo['user_mail']
                let fav = userInfo['favorite']
    
                let temp_html = `<div class="user-info">
                                    <h3>${name}</h3>
                                    <h3>${email}</h3>    
                                </div>`
                $('.user').append(temp_html)

                for (let i = 0; i < fav.length; i++) {
                    let temp_html2 = `<div class="rank-card-cook">
                                        <div>
                                            <img src="../static/recipe-image/${fav[i]}.png" class="rank-card-cook-image" alt="cook image" onclick="search_recipe('${fav[i]}')" style="cursor: pointer">
                                        </div>
    
                                        <div class="rank-card-cook-title">
                                            <h3>${fav[i]}</h3>

                                            <a  onclick="favorite_delete('${fav[i]}')">
                                            <i class="fas fa-trash-alt"></i>
                                            </a>
                                        </div>
    
                                    </div>`
                    $('.star-list').append(temp_html2)
                }
            }
        })    
}

function favorite_delete(name) {
    $.ajax({
        type: "POST",
        url: "/favorite/delete",
        data: {recipe_give: name},
        success: function (response) {
            alert(response['msg']);
            window.location.reload();
        }
    })
}
