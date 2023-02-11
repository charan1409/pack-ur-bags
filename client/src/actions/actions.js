export const actionCreators={
    add:()=>({type:"increment"}),
    username:(username)=>({type:"username",payload:{username}}),
    tours:(tours)=>({type:"tours",payload:{tours}})
}
