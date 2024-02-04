import { Injectable } from '@angular/core';

import { Storage, uploadBytes, ref } from '@angular/fire/storage';
import { getDownloadURL } from 'rxfire/storage';
import { Observable, switchMap, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage: Storage) { }

  uploadImage(image: File , path:string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));

    return uploadTask.pipe(
      switchMap((res:any) => getDownloadURL(res.ref))
    )
  }
}
