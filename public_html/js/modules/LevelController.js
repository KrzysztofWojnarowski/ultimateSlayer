define(["levels/Level","models/EquipmentFactory","LevelGenerator"], function(levels,EquipmentFactory,LevelGenerator) {
    
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
          var level = levelGenerator.generateLevel(0);
          var factory = new EquipmentFactory(),
             dst={};
     console.log(level);
          //return factory.preventTypeClone(levels.set[index],dst);
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
