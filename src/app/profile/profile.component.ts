import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, switchMap } from 'rxjs';
import { Router } from '@angular/router';
// import { ProfileUser } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user$ = this.authService.currentUser$

  constructor(public authService: AuthenticationService,private is: ImageUploadService, private toast: HotToastService,private router:Router){}

  uploadImage(event: any, user: any){
    this.is.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(

      this.toast.observe({
        loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
      }),
      switchMap((photoURL: any) => this.authService.updateProfileData({photoURL}))
    ).subscribe();

  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/'])
    })
  }

}
