class NavBarCtrl {
    constructor(){
        this.date = new Date();
    }
}


const NavBarComponent = {
  templateUrl: 'components/navbar/views/navbarView.html',
  controller: NavBarCtrl
};

export {NavBarComponent};