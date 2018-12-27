const formCache={}
const formManager={
    put:(id,form)=>{
        formCache[id]=form;
    },
    get:id=>formCache[id]
};
export default formManager;