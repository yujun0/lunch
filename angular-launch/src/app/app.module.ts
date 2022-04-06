import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Content
import { AppComponent } from './app.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { SelectedComponent } from './layouts/container/selected/selected.component';
import { StorelistComponent } from './layouts/container/storelist/storelist.component';
import { FooterComponent } from './layouts/footer/footer/footer.component';

// Kendo UI Component
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule,  NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './layouts/container/about/about.component';
import { SimplelistComponent } from './layouts/container/simplelist/simplelist.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    SelectedComponent,
    StorelistComponent,
    AboutComponent,
    SimplelistComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ButtonsModule,
    DialogsModule,
    DropDownsModule,
    FormsModule,
    GridModule,
    IconsModule,
    InputsModule,
    LabelModule,
    LayoutModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    ScrollViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
