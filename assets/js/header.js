document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
        <!-- Header Area Start -->
        <nav class="fag-header navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="../index.html"><img src="../assets/img/logo.png" alt="Basket Random" /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="menu-toggle"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <ul class="header_menu mr-auto">
                        <li class="nav-item active">
                            <a href="https://basket-random.io/index.html" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://basket-random.io/action/index.html" class="nav-link">Action</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://basket-random.io/adventure/index.html" class="nav-link">Adventure</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://basket-random.io/bike/index.html" class="nav-link">Bike</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://basket-random.io/car/index.html" class="nav-link">Car</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://basket-random.io/sport/index.html" class="nav-link">Sport</a>
                        </li>
                         <li class="nav-item active">
                            <a href="https://basket-random.io/game/basket-random.html" class="nav-link">Basket Random</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://basket-random.io/2-player-games/index.html" class="nav-link">2 Player Games</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">More</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="https://basket-random.io/idle/index.html">Idle</a></li>
                                <li><a class="dropdown-item" href="https://basket-random.io/shooting/index.html">Shooting</a></li>
                                <li><a class="dropdown-item" href="https://basket-random.io/skill/index.html">Skill</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Header Area End -->
    `;

    document.querySelector("header").innerHTML = headerHTML;
});
