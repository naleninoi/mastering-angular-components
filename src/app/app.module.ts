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
import { ProjectComponent } from './projects/project/project.component';
import { ProjectContainerComponent } from './containers/projects-container/project-container.component';
import { TabsComponent } from './ui/tabs/tabs/tabs.component';
import { NavigationItemComponent } from './ui/navigation/navigation-item/navigation-item.component';
import { NavigationSectionComponent } from './ui/navigation/navigation-section/navigation-section.component';
import { NavigationComponent } from './ui/navigation/navigation/navigation.component';
import { EditorComponent } from './ui/editor/editor.component';
import {UserService} from "./users/user.service";
import { ProfilePictureComponent } from './users/profile-picture/profile-picture.component';
import { UserAreaComponent } from './users/user-area/user-area.component';
import { FromNowPipe } from './pipes/from-now.pipe';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';
import { ProjectCommentsContainerComponent } from './containers/project-comments-container/project-comments-container.component';
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { ActivitySliderComponent } from './activities/activity-slider/activity-slider.component';
import { ActivityComponent } from './activities/activity/activity.component';

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
    EditorComponent,
    ProfilePictureComponent,
    UserAreaComponent,
    FromNowPipe,
    CommentComponent,
    CommentsListComponent,
    ProjectCommentsContainerComponent,
    ActivitySliderComponent,
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(Database, {dataEncapsulation: false, delay: 0}),
    RouterModule.forRoot(routes)
  ],
  providers: [ProjectService, TaskService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
