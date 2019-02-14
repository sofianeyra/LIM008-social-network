import { signIn, register} from './templates/template-login.js';
import { profile } from './templates/template-perfil.js'; 
import { writingPost} from './templates/template-post.js';
import { callDoc } from './controller-function/function-perfil.js';
import {idUser} from './lib-view/controller-login.js';
import { postPrivacyState} from './lib-view/controller-post.js';

const changeTmp = (hash) => {
  if (hash === '#/' || hash === '' || hash === '#') {
    return viewTmp('#/signIn');
  } else if (hash === '#/signIn' || hash === '#/register' || hash === '#/profile' || hash === '#/writingPost' || hash === '#/wall') {
    return viewTmp(hash);
  } else {
    return viewTmp('#/signIn');
  }
};

const viewTmp = (routers) => {
  const router = routers.substr(2, routers.length - 2);
  const section = document.getElementById('log-container');
  const postSection = document.getElementById('post-container-box');
  postSection.innerHTML = '';
  section.innerHTML = '';
  switch (router) {
  case 'wall':
    postPrivacyState((objPost) => {
      postSection.innerHTML = '';
      console.log(objPost);
      postSection.appendChild(writingPost(objPost));
    });
    // privacyStatePost('publico', (dataPost) => {
    //   postSection.innerHTML = '';
    //   postSection.appendChild(writingPost(dataPost));
    // });
    // postSection.style.display = 'block'; // DISPLAY

    break;
  case 'writingPost':
    postPrivacyState((objPost) => {
      postSection.innerHTML = '';
      console.log(objPost);
      postSection.appendChild(writingPost(objPost));
    });
    break;
      
  case 'profile':
    callDoc((data) => {
      section.innerHTML = '';
      section.appendChild(profile(data));
    });
    // privacyStatePost('Privado', (dataPost) => {
    //   postSection.innerHTML = '';
    //   postSection.appendChild(writingPost(dataPost));
    // });
    // postSection.style.display = 'none'; // DISPLAY

    break;
  case 'register':
    section.appendChild(register());
    break;
      
  case 'signIn':
    
    section.appendChild(signIn());
    
    break;
      
  default:
    section.appendChild(signIn());
    break;
  }
};

export const routerRed = () => {
  window.addEventListener('load',
    changeTmp(window.location.hash));
  if (('onhashchange' in window)) window.onhashchange = () => changeTmp(window.location.hash);
};