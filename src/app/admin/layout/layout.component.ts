import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy,
 OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {RegisterService} from '../../core/services/personne/membre/register.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements  OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  @ViewChild('sidenav') sidenav: any;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;
	public InfoMembres: any = {};
	private urlgetbyLogin = 'http://localhost:8080/membresLogin/';
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
   public regist: RegisterService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
	this.getByLogin();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  gotoHome () {
    this.router.navigate(['/']);
  }

  ngAfterViewInit () {
    this.sidenav.toggle();
  }
  
  
    getByLogin(){
		const strValue: string = localStorage.getItem('log');
		if(strValue){
				let u = this;
				let url = u.regist.urlgetLogin;
			$.getJSON( u.urlgetbyLogin + strValue, function( data ) {
 
					u.InfoMembres = data.body;
			});
			
			
		
		}

	}
}
