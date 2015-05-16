define(["levels/Level","models/EquipmentFactory"], function(levels,EquipmentFactory) {
    
  return{
      
      
      mesh:{
          foreground:"",
          background:""
      },
      viewportAxis:{
          x:0,
          y:0
      },
      actors:[],
      
      init:function(index){
          
          
          
      },
      
      getLevel:function(index){
          var factory = new EquipmentFactory(),
             dst={};
          return factory.preventTypeClone(levels.set[index],dst);
      },
      buildLevel:function(){
          
      },
      shallEnd:function(){
          
      },
      setStage:function(viewport){
          
      }
      
      
  };
        


});
