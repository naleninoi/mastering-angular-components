import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskComponent } from './tasks/task/task.component';
import { EnterTaskComponent } from './tasks/enter-task/enter-task.component';
import { CheckboxComponent } from './ui/checkbox/checkbox.component';
import { TaskService } from './tasks/task.service';
import { ToggleComponent } from './ui/toggle/toggle.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {Database} from "./database";
import { TaskListContainerComponent } from './containers/task-list-container/task-list-container.component';
import { ProjectService } from './projects/project.service';
import { ProjectComponent } from './projects/projects/project.component';
import { ProjectContainerComponent } from './containers/projects-container/project-container.component';
import { TabsComponent } from './ui/tabs/tabs/tabs.component';
import { NavigationItemComponent } from './ui/navigation/navigation-item/navigation-item.component';
import { NavigationSectionComponent } from './ui/navigation/navigation-section/navigation-section.component';
import { NavigationComponent } from './ui/navigation/navigation/navigation.component';
import { EditorComponent } from './ui/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    EnterTaskComponent,
    CheckboxComponent,
    ToggleComponent,
    TaskListContainerComponent,
    ProjectComponent,
    ProjectContainerComponent,
    TabsComponent,
    NavigationItemComponent,
    NavigationSectionComponent,
    NavigationComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(Database, {dataEncapsulation: false, delay: 0})
  ],
  providers: [ProjectService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
