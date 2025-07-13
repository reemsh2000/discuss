export const paths = {
   home(){
    return '/'
   },
   topicShow(topicId: string) {
    return `/topics/${topicId}`
   },
   postCreate(topicId: string) {
    return `/topics/${topicId}/posts/create`
   },
   postEdit(topicId: string, postId: string) {
    return `/topics/${topicId}/posts/${postId}/edit`
   },
   postShow(topicId: string, postId: string) {
    return `/topics/${topicId}/posts/${postId}`
   },
   

}