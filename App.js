import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, ScrollView, useColorScheme} from 'react-native'
import './global.css'

const App = () => {

  // Tareas de prueba
  const [tareas, setTareas] = useState([
    {id: 1, texto: "Hacer la práctica 1 (PostIt)", completada: true},
    {id: 2, texto: 'Hacer la práctica 2 (Nativewind)', completada: true},
    {id: 3, texto: 'Hacer la práctica 3 (Cámara)', completada: false}
  ])

  const [nuevaTarea, setNuevaTarea] = useState('')

  const agregarTarea = () => {
    
    if (nuevaTarea.trim() === '') return

    const tarea = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false
    }

    setTareas([...tareas, tarea])
    setNuevaTarea('')
  }
  
  const toggleTarea = (id) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? {...tarea, completada:!tarea.completada} : tarea
    ))
  }

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id))
  }

  const tareasCompletadas = tareas.filter(item => item.completada).length
  const totalTareas = tareas.length

  return (
    <View className='flex-1 bg-gray-800 p-6 pt-16'>
      
      <View className='mb-8 w-full'>
        <Text className='text-4xl align-center font-bold text-white mb-2 text-center'>
          Tareas
        </Text>
        <Text className='text-lg text-green-300 text-center'>
          {totalTareas > 0 ? `${tareasCompletadas} de ${totalTareas} completadas` : "No hay tareas"}
        </Text>
      </View>

      <View className='flex-row gap-2 absolute bottom-4 left-0 right-0 w-80vw mx-4 z-10'>
        <TextInput 
          className='flex-1 bg-gray-700 px-4 py-3 rounded-xl border-2 border-white text-white mr-3' 
          placeholder="Escribe una nueva tarea"
          placeholderTextColor="white"
          value={nuevaTarea}
          onChangeText={setNuevaTarea}
        />
        <TouchableOpacity
          onPress={agregarTarea}
          className="bg-cyan-500 px-6 py-3 rounded-xl active:bg-cyan-600"
        >
          <Text className="text-white font-semibold text-2xl">+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {tareas.map((tarea)=>(
          <View
            key={tarea.id}
            className={`bg-gray-900 p-4 rounded-xl mb-3 border-2 ${tarea.completada ? 'border-green-300 bg-green-900':'border-gray-200'}`}
          >
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity
                className='flex-1 flex-row items-center gap-3'
                onPress={()=> toggleTarea(tarea.id)}
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    tarea.completada
                      ? 'bg-green-300 border-green-300'
                      : 'border-gray-400'
                  }`}
                >
                  {tarea.completada && (
                    <Text className="text-white text-sm font-bold"></Text>
                  )}
                </View>
                <Text
                  className={`flex-1 text-lg ${
                    tarea.completada
                      ? 'text-green-300 line-through'
                      : 'text-gray-100'
                  }`}
                >
                  {tarea.texto}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={()=>eliminarTarea(tarea.id)}
                className='bg-transparent px-3 py-2 rounded-lg active:border-red-200'
              >
                <Text className='text-lg'>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {tareas.length === 0 && (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-100 text-3xl font-bold text-center pb-3">
              ¡No hay tareas!
            </Text>
            <Text className="text-gray-100 text-xl text-center">
              Escribe una tarea en el cuadro de texto de abajo, y usa el botón para agregarla.
            </Text>
            <Text className="text-gray-100 text-3xl font-bold"></Text>
          </View>
        )}

      </ScrollView>
    </View>
  )

}

export default App