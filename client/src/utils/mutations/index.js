//import mutations here
import { UPLOAD_DOG_IMAGES, UPLOAD_OWNER_IMAGES } from "./imageMutations";
import { POST_MESSAGE, CREATE_CONVO } from "./conversationMutations";
import { LOGIN_USER, SIGNUP_USER, PUT_OWNER } from "./ownerMutations";
import { PUT_DOG, CREATE_DOG, DELETE_DOG } from "./dogMutations";

//export mutations here, add to the list
export {
   UPLOAD_DOG_IMAGES,
   UPLOAD_OWNER_IMAGES,
   SIGNUP_USER,
   POST_MESSAGE,
   CREATE_CONVO,
   LOGIN_USER,
   CREATE_DOG,
   PUT_DOG,
   PUT_OWNER,
   DELETE_DOG,
}
