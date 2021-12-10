import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet } from '@ionic/angular';
import { WelcomePage } from '../welcome.page';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form: FormGroup;
  selectedImage: any;
  

  constructor() {
    this.initForm();
   }

  ngOnInit() {
  }
  initForm(){
    this.form = new FormGroup({
      fullname: new FormControl(null, {validators: [Validators.required, ]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      telephone: new FormControl(null, {validators: [Validators.required, ]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
    });
  }

  checkPlatformForWeb() {
    if(Capacitor.getPlatform()=='web') return true;
    return false;
  }
  async takePicture() {
    //await Camera.requestPermissions();
    
      const image = await Camera.getPhoto({
        quality: 50,
        //allowEditing: true,
        source:CameraSource.Prompt,
        width: 600,
        resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.DataUrl
      });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      this.selectedImage = image;
      if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;
    
      // Can be set to the src of an image now
     // imageElement.src = imageUrl;
  
}
  onsubmit() {
    if (!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
 }
 
}
  


