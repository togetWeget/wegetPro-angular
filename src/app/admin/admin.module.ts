import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {AccueilComponent} from './accueil/accueil.component';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,

  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FooterComponent} from './footer/footer.component';
import {CoreModule} from '../core/core.module';
import {CustomMeterialModule} from '../custom-meterial/custom-meterial.module';
import {RouterModule} from '@angular/router';
import {Chatroom2Component} from './chatroom2/chatroom2.component';
import {FilterPipe} from './chatroom2/Filtermembre.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterPipeModule} from 'ngx-filter-pipe';
import { TopZoneComponent } from './comp/top-zone/top-zone.component';
import { WidgetInfoComponent } from './comp/widget-info/widget-info.component';
import { AdminTableComponent } from './comp/admin-table/admin-table.component';
import { AdminCardComponent } from './comp/admin-card/admin-card.component';
import { AdminBlockComponent } from './comp/admin-block/admin-block.component';
import { ApercuBlockComponent } from './comp/apercu-block/apercu-block.component';
import { AdminTarifsComponent } from './comp/admin-tarifs/admin-tarifs.component';
import { ListEspaceComponent } from './paiement/list-espace/list-espace.component';
import { BlockComponent } from './paiement/block/block.component';
import { FormuleComponent } from './paiement/formules/formule.component';
import { DesabonneComponent } from './paiement/desabonne/desabonne.component';
import { ReabonneComponent } from './paiement/reabonne/reabonne.component';
import { HistoriqueComponent } from './paiement/historique/historique.component';
import { CoverProfilComponent } from './comp/cover-profil/cover-profil.component';
import { ListeMessageComponent } from './messagerie/liste-message/liste-message.component';
import { MessageComponent } from './messagerie/message/message.component';
import { ViewMessageComponent } from './messagerie/view-message/view-message.component';
import { SupprimeMessageComponent } from './messagerie/supprime-message/supprime-message.component';
import { RepondreMessageComponent } from './messagerie/repondre-message/repondre-message.component';
import { LayoutMessageComponent } from './messagerie/layout-message/layout-message.component';
import { ListeMessageEnvoyeComponent } from
'./messagerie/liste-message-envoye/liste-message-envoye.component';
import { LayoutCompteComponent } from './compte/layout-compte/layout-compte.component';
import { EspaceComponent } from './paiement/espace/espace.component';
import { DetailsCompteComponent } from './compte/details-compte/details-compte.component';
import { FormationCompteComponent } from './compte/formation-compte/formation-compte.component';
import { ExperienceCompteComponent } from './compte/experience-compte/experience-compte.component';
import { AuthCompteComponent } from './compte/auth-compte/auth-compte.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutEcoleComponent } from './espace-ecole/layout-ecole/layout-ecole.component';
import { LayoutCompetenceComponent } from './espace-competence/layout-competence/layout-competence.component';
import { LayoutImmobilierComponent } from './espace-immobilier/layout-immobilier/layout-immobilier.component';
import { LayoutAnnonceComponent } from './espace-annonce/layout-annonce/layout-annonce.component';
import { CoverSelectComponent } from './compte/cover-select/cover-select.component';
import { PhotoCompetenceComponent } from './espace-competence/photo-competence/photo-competence.component';
import { FormationCompetenceComponent } from './espace-competence/formation-competence/formation-competence.component';
import { ExperienceCompetenceComponent } from './espace-competence/experience-competence/experience-competence.component';
import { DocumentsCompetenceComponent } from './espace-competence/documents-competence/documents-competence.component';
import { CvCompetenceComponent } from './espace-competence/cv-competence/cv-competence.component';
import { InfoPersoComponent } from './compte/info-perso/info-perso.component';
import { InfoProComponent } from './compte/info-pro/info-pro.component';
import { SocialComponent } from './compte/social/social.component';
import { CvComponent } from './compte/cv/cv.component';
import {NgxMaskModule} from 'ngx-mask';
import { MonEcoleComponent } from './espace-ecole/mon-ecole/mon-ecole.component';
import { EnteteEcoleComponent } from './espace-ecole/entete-ecole/entete-ecole.component';
import { FlashInfoEcoleComponent } from './espace-ecole/flash-info-ecole/flash-info-ecole.component';
import { FormationsEcoleComponent } from './espace-ecole/formations-ecole/formations-ecole.component';
import { DocumentsEcoleComponent } from './espace-ecole/documents-ecole/documents-ecole.component';
import { PhotosEcoleComponent } from './espace-ecole/photos-ecole/photos-ecole.component';
import { ModifPhotoComponent } from './compte/modif-photo/modif-photo.component';
import { GalleryComponent } from './compte/gallery/gallery.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ModifPhotoEcoleComponent } from './espace-ecole/modif-photo-ecole/modif-photo-ecole.component';
import { MatdiologComponent } from './compte/gallery/matdiolog/matdiolog.component';
import { AllGalleryComponent } from './compte/gallery/all-gallery/all-gallery.component';
import { VideoComponent } from './compte/gallery/video/video.component';
import { PhotosComponent } from './compte/gallery/photos/photos.component';
import { ContactComponent } from './messagerie/contact/contact.component';
import { ListContactComponent } from './messagerie/list-contact/list-contact.component';
import { ImgloardComponent } from './compte/gallery/matdiolog/imgloard/imgloard.component';
import { VideoloardComponent } from './compte/gallery/matdiolog/videoloard/videoloard.component';
import { UploadDocComponent } from './comp/upload-doc/upload-doc.component';
import { CardFormationEcoleComponent } from './comp/card-formation-ecole/card-formation-ecole.component';
import { FormationEcoleAddComponent } from './espace-ecole/formation-ecole-add/formation-ecole-add.component';
// import { NgxEditorModule } from 'ngx-editor';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
    NgSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    // NgxEditorModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [
   LayoutComponent,
   AccueilComponent,
   FooterComponent,
   Chatroom2Component,
   FilterPipe,
   TopZoneComponent,
   WidgetInfoComponent,
   AdminTableComponent,
   AdminCardComponent,
   AdminBlockComponent,
   ApercuBlockComponent,
   AdminTarifsComponent, ListEspaceComponent,
   BlockComponent, FormuleComponent,
   DesabonneComponent, ReabonneComponent, HistoriqueComponent,
   CoverProfilComponent,ListeMessageComponent, MessageComponent, ViewMessageComponent,
   SupprimeMessageComponent, RepondreMessageComponent, LayoutMessageComponent,
   ListeMessageEnvoyeComponent, LayoutCompteComponent, EspaceComponent,
   DetailsCompteComponent, FormationCompteComponent, ExperienceCompteComponent,
   AuthCompteComponent, CoverSelectComponent, InfoPersoComponent, InfoProComponent, SocialComponent, CvComponent, 
   LayoutEcoleComponent, LayoutCompetenceComponent, LayoutImmobilierComponent, LayoutAnnonceComponent, 
   PhotoCompetenceComponent, FormationCompetenceComponent, ExperienceCompetenceComponent, 
   DocumentsCompetenceComponent, CvCompetenceComponent,
   MonEcoleComponent, EnteteEcoleComponent, FlashInfoEcoleComponent, FormationsEcoleComponent,
   DocumentsEcoleComponent, PhotosEcoleComponent, ModifPhotoComponent, GalleryComponent, ModifPhotoEcoleComponent, 
   MatdiologComponent, AllGalleryComponent, VideoComponent, PhotosComponent, ContactComponent,
    ListContactComponent, ImgloardComponent, VideoloardComponent, UploadDocComponent, CardFormationEcoleComponent,
     FormationEcoleAddComponent
  ],
  entryComponents: [BlockComponent,CoverSelectComponent, MatdiologComponent, ImgloardComponent, 
  VideoloardComponent, FormationEcoleAddComponent ],
  exports: [LayoutComponent]
})
export class AdminModule {
}
