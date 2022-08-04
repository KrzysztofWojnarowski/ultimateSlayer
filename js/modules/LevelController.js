define(["models/EquipmentFactory","LevelGenerator"], function(EquipmentFactory,LevelGenerator) {
    
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
          var levelGenerator = new LevelGenerator();
          var level = levelGenerator.generateLevel(index);
          var factory = new EquipmentFactory(),
             dst={};
          return factory.preventTypeClone(level,dst);
      },
      buildLevel:function(){
          
      },
      shallEnd:function(){
          
      },
      setStage:function(viewport){
          
      }
      
      
  };
        


});
