import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'src/app/models/message';
import { ForumService } from 'src/app/services/forum.service';
import { MessageImage } from 'src/app/models/messageimage';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image.modal.component.html',
  styleUrls: ['./image.modal.component.scss'],
})

export class ImageModalComponent implements OnInit {

    @Input('message') message: Message;

    messageImageUrl;
    selectedFile: File;
    messageImages: Array<MessageImage>;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal,
                private forumService: ForumService) { }

                
    ngOnInit(){
        this.messageImageUrl = this.forumService.messageImageUrl;

        this.forumService.getImages().subscribe(res => {
            this.messageImages = res as Array<MessageImage>;
        });
    }

    uploadImage(){

        if(!this.selectedFile || !this.message){
            return;
        }

        this.forumService.uploadImage(this.selectedFile, this.message.code).subscribe(res => {
            this.ngOnInit();
        },
        (err => {
            console.log("Saving failed");
        }
        ));

    }

    onSelectImage(codeMessageImage: number){
        this.message.messageText = this.message.messageText + " [i:" + codeMessageImage + "] ";
        this.activeModal.close();
    }

    onFileChanged(event){
        this.selectedFile = event.target.files.item(0);
    }

    onDismiss() {
        this.activeModal.dismiss('Dismissed!');
    }
  
    onClose() {
        this.activeModal.close();
    }
  }
