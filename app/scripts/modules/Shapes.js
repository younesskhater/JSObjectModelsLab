(function(global) {
  'use strict';
  global.Shapes = {
    VERSION:'V001'
  };

      var createShape = function(attributes) {

        attributes._id = attributes._id || null;
        attributes.name = attributes.name || null;
        attributes.nodes = attributes.nodes || '[]';

        var Shape = {}; // The new object to be returned.

        Shape.toString = function() { // public methods accessing hidden parameters.
            return '(' + attributes._id + ', ' + attributes.name +', '+attributes.nodes +')';
        };

        return Shape; // return the newly created object.
    };



    function createRoad(attributes) {
        return Object.create(createShape(), {
          _id: {
               value: attributes.building
           },

         building: {
              value: attributes.building
          },
          name: {
              value: attributes.name
          },
          highway: {
              value: attributes.highway
          },
          nodes: {
              value: attributes._nodes
          },
          getCategory: {
              value: function() {
                  return String(attributes.highway);
              },
          }
        });
      }

      function createBuilding(attributes) {
     return Object.create(createShape, {
       _id: {
           value: attributes._id
       },
       nodes: {
           value: attributes.nodes
       },
       getArea: {
           value: function() {
             var area = 0;
             for (var i = 0; i < attributes.nodes.length; i++) {
               if (i != attributes.nodes.length - 1) {
                 area += (attributes.nodes[i].x * attributes.nodes[i+1].y) - (attributes.nodes[i].y * attributes.nodes[i+1].x);
               } else {
                 area += (attributes.nodes[i].x * attributes.nodes[0].y) - (attributes.nodes[i].y * attributes.nodes[0].x);
               }
             }
             return Math.abs(area / 2);
           },
       }
     });
   }

        function createAmenity(attributes) {
            return Object.create(createShape, {
              _id: {
                  value: attributes._id
              },
              nodes: {
                  value: attributes._nodes
              },
              amenity: {
                  value: attributes._amenity
              },
              getType: {
                  value: function() {
                      return String(attributes.amenity);
                  },
              }
            });
          }

          function createNatural(attributes) {
              return Object.create(createShape(), {
                _id: {
                     value: attributes.building
                 },
               building: {
                    value: attributes.building
                },
                name: {
                    value: attributes.name
                },
                natural: {
                    value: attributes.natural
                },
                getType: {
                    value: function() {
                        return String(attributes.natural);
                    },
                }
              });
            }

      // Expose public API
      global.createShape = createShape;
      global.createRoad = createRoad;
      global.createBuilding = createBuilding;
      global.createAmenity = createAmenity;
      global.createNatural = createNatural;

}(this));
