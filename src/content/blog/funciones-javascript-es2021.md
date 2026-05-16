---
title: "Funciones que veremos en Javascript este 2021"
date: "2021-03-26"
excerpt: "Cinco funcionalidades de JavaScript que alcanzaron Stage 4 y llegaron al estándar ES2021: separadores numéricos, asignación lógica, WeakRef, Promise.any() y replaceAll."
source: "Blog"
---

La especificación ES2021 de JavaScript trae consigo cinco funcionalidades que llegaron al Stage 4 del proceso TC39 y que ya puedes usar con seguridad. Aquí te explico cada una.

## Numeric Separators

Los separadores numéricos permiten usar guiones bajos en literales numéricos para mejorar la legibilidad, sin afectar el comportamiento en tiempo de ejecución:

```js
1_000_000_000   // decimales
0b1010_0001     // binario
101_475_938.38  // punto flotante
```

Una mejora pequeña pero muy valiosa cuando trabajas con números grandes.

## Logical Assignment

Tres nuevos operadores que combinan operadores lógicos con asignación:

```js
// Asigna solo si el valor es falsy
a ||= b

// Asigna solo si el valor es truthy
a &&= b

// Asigna solo si el valor es null o undefined
a ??= b
```

Especialmente útil para establecer valores por defecto de forma concisa.

## WeakRef y FinalizationRegistry

Dos objetos avanzados para manejar referencias débiles sin impedir la recolección de basura. `WeakRef` permite mantener una referencia a un objeto sin bloquear su liberación de memoria. `FinalizationRegistry` permite registrar callbacks que se ejecutan cuando un objeto es recolectado.

Son herramientas de bajo nivel, útiles en casos muy específicos como caches o estructuras de datos complejas.

## Promise.any()

Complementa el conjunto de métodos de `Promise`. Devuelve la primera promesa que se resuelva exitosamente, o rechaza con un `AggregateError` si todas las promesas fallan:

```js
const primera = await Promise.any([p1, p2, p3]);
```

A diferencia de `Promise.race()`, ignora los rechazos a menos que todas fallen.

## String.prototype.replaceAll()

Reemplaza todas las ocurrencias de una subcadena sin necesidad de expresiones regulares:

```js
'aabbcc'.replaceAll('b', '.') // 'aa..cc'
```

Simple y directo. Ya no más `/b/g` para reemplazos globales básicos.

---

ES2021 no es la versión más revolucionaria de JavaScript, pero estas adiciones hacen el código más legible y expresivo. Vale la pena conocerlas.
