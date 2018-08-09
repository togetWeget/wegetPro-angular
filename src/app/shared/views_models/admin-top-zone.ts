import {Navs} from './navs';

export class AdminTopZone {
  constructor (
  	public titre?: string, 
  	public sous_titre?: string, 
  	public navs?: Navs[],
    public active_nav?: Navs, 
    public fa?: string
    ) {}
}
