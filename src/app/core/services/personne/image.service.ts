import {Injectable} from '@angular/core';

@Injectable()
export class ImageService {
  visibleImages = [];

  getImages() {
    return this.visibleImages = IMAGES.slice(0);
  }

  getImage(id: number) {
    return IMAGES.slice(0).find(image => image.id === id);
  }

  constructor() {
  }

}

const IMAGES = [
  {'id': 1, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/03-700x471.jpg'},
  {'id': 2, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/09-700x471.jpg'},
  {'id': 3, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/10-700x525.jpg'},
  {'id': 4, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/11-700x467.jpg'},
  {'id': 5, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/America_F.jpg'},
  {'id': 6, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/d8874fb5369f917a3b2280f275ec3319_thumb.png'},
  {'id': 7, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/Desert.jpg'},
  {'id': 8, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/developpeur.jpg'},
  {'id': 9, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/espace.jpg'},
  {'id': 10, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/exemple_verdes.jpg'},
  {'id': 11, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/FB_IMG_1483377676120.jpg'},
  {'id': 12, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/homme1.jpg'},
  {'id': 13, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/images1.jpg'},
  {'id': 14, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/index.jpg'},
  {'id': 15, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/linux.jpg'},
  {'id': 16, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/Premiere-Dame-2.jpg'},
  {'id': 17, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/unknown_user.png'},
  {'id': 18, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/user.png'},
  {'id': 19, 'category': 'boats', 'caption': 'voir image', 'url': 'assets/photo/user-mini.png'}


];
