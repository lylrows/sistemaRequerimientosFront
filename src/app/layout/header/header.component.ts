import { ConfigService } from '../../config/config.service';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { RightSidebarService } from 'src/app/core/service/rightsidebar.service';
import { Role } from 'src/app/core/models/role';
import { LanguageService } from 'src/app/core/service/language.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { interval } from 'rxjs';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
const document: any = window.document;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  @ViewChild('dropdown') dropdown: NgbDropdown;
  showDropdown = false;
  public config: any = {};
  userImg: string;
  homePage: string;
  isNavbarCollapsed = true;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService
  ) {
    super();
    localStorage.setItem('tickets', '');
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.svg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.svg', lang: 'de' },
  ];
  notifications: any[] = [
    {
      message: 'Por favor revise su correo',
      time: '14 mins ago',
      icon: 'mail',
      color: 'nfc-green',
      status: 'msg-unread',
    },
    {
      message: 'Nuevos mensajes de soporte',
      time: '22 mins ago',
      icon: 'person_add',
      color: 'nfc-blue',
      status: 'msg-read',
    },
    {
      message: 'Tu soporte fue aprobado por el cliente!!',
      time: '3 hours ago',
      icon: 'event_available',
      color: 'nfc-orange',
      status: 'msg-read',
    },
    {
      message: 'Hagamos un descanso para almorzar...',
      time: '5 hours ago',
      icon: 'lunch_dining',
      color: 'nfc-blue',
      status: 'msg-read',
    },
    {
      message: 'Informe del soporte  generado',
      time: '14 mins ago',
      icon: 'description',
      color: 'nfc-green',
      status: 'msg-read',
    },
    {
      message: 'Please check your mail',
      time: '22 mins ago',
      icon: 'mail',
      color: 'nfc-red',
      status: 'msg-read',
    },
    {
      message: 'Salary credited...',
      time: '3 hours ago',
      icon: 'paid',
      color: 'nfc-purple',
      status: 'msg-read',
    },
  ];
  ngOnInit() {    
    this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;
    this.userImg = this.authService.currentUserValue.img;

    if (userRole === Role.Admin) {
      this.homePage = 'admin/tableros/dashboard';
    } else if (userRole === Role.Cliente) {
      this.homePage = 'cliente/dashboard';
    } else if (userRole === Role.Soporte) {
      this.homePage = 'soporte/dashboard';
    } else {
      this.homePage = 'admin/tableros/dashboard';
    }

    this.langStoreValue = localStorage.getItem('lang');
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.svg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
    this.checkNewTickets();
    interval(60000).subscribe(() => this.checkNewTickets());
  }
  checkNewTickets() {
    this.notifications = [];
    this.authService.getTicketsPendientes(this.authService.currentUserValue.id).subscribe( res =>{
      console.log("nroTicket", res.objModel)
      let tickets = localStorage.getItem('tickets');
      if(tickets == ''){
        if(res.objModel == 0){
          const note ={
            message: 'No tiene tickets Pendientes!!',
            time: '',
            icon: 'event_available',
            color: 'nfc-green',
            status: 'msg-read',
          }
          this.notifications.push(note);
        }else{
          const note = {
            message: 'Tienes ' +res.objModel + ' ticket(s) pendiente(s)',
            time: '',
            icon: 'mail',
            color: 'nfc-green',
            status: 'msg-unread',
          }
          this.notifications.push(note);
          localStorage.setItem('tickets', res.objModel);
        }
        
      }else{
        let numberTickets = Number(tickets);
        if(res.objModel == 0){
          const note ={
            message: 'No tiene tickets Pendientes!!',
            time: '',
            icon: 'event_available',
            color: 'nfc-green',
            status: 'msg-read',
          }
          this.notifications.push(note);
          this.showDropdown = false;
        }else{
          if(res.objModel == numberTickets){
            const note = {
              message: 'Tienes ' +res.objModel + ' ticket(s) pendiente(s)',
              time: '',
              icon: 'mail',
              color: 'nfc-green',
              status: 'msg-unread',
            }
            this.notifications.push(note);
            this.showDropdown = false;
          }
          if(numberTickets < res.objModel){
            let nuevo = numberTickets - res.objModel;
            let note ={
              message: 'Tienes ' + nuevo + ' ticket(s) nuevo(s)',
              time: '',
              icon: 'event_available',
              color: 'nfc-orange',
              status: 'msg-read',
            }
            this.notifications.push(note);
            let note2 = {
              message: 'Tienes ' +res.objModel + ' ticket(s) pendiente(s)',
              time: '',
              icon: 'mail',
              color: 'nfc-green',
              status: 'msg-unread',
            }
            this.notifications.push(note2);
            this.showDropdown = true;
            this.playAlertSound();
          }else{
            this.showDropdown = false;
          }  

        }
        localStorage.setItem('tickets', res.objModel);        
      }
    })
  }
  playAlertSound() {
    const audio = new Audio('assets/audio/pristine-609.mp3');
    audio.play().catch((error) => console.error('Error al reproducir el sonido de alerta:', error));
  }
  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem('theme'));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menuOption')
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'menu_' + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_logoheader')
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'logo-' + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem('sidebar_status')) {
      if (localStorage.getItem('sidebar_status') === 'close') {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      } else {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      }
    }
    if (this.showDropdown) {
      this.dropdown.open();
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/inicio/login']);
      }
    });
  }
}
