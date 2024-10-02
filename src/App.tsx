import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function App() {
  const generateRandomHeight = () => Math.floor(Math.random() * 91) + 10;

  const initialObjects = Array.from({ length: 280 }, (_, index) => ({
    id: index + 1,
    width: 16,
    height: generateRandomHeight(),
    backgroundColor: "white",
  }));

  const [objects, setObjects] = useState(initialObjects);
  const randomData = () => {
    setObjects((prevObjects) =>
      prevObjects.map((object) => ({
        ...object,
        height: generateRandomHeight(),
      }))
    );
  };
  const bublesortByHeigghtWithDelay = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < objects.length; i++) {
      for (let j = 0; j < objects.length - i - 1; j++) {
        if (objects[j].height > objects[j + 1].height) {
          const temp = objects[j];
          objects[j] = objects[j + 1];
          objects[j + 1] = temp;
          setObjects([...objects]);
          await delay(10);
        }
      }
    }
  };
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Selection Sort
  const selectionSortByHeightWithDelay = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    for (let i = 0; i < objects.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < objects.length; j++) {
        if (objects[j].height < objects[minIndex].height) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = objects[i];
        objects[i] = objects[minIndex];
        objects[minIndex] = temp;
        setObjects([...objects]);
        await delay(10);
      }
    }
  };

  // Insertion Sort
  const insertionSortByHeightWithDelay = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    for (let i = 1; i < objects.length; i++) {
      const key = objects[i];
      let j = i - 1;
      while (j >= 0 && objects[j].height > key.height) {
        objects[j + 1] = objects[j];
        j--;
      }
      objects[j + 1] = key;
      setObjects([...objects]);
      await delay(10);
    }
  };

  // Quick Sort
  const quickSortByHeightWithDelay = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>,
    low = 0,
    high = objects.length - 1
  ) => {
    if (low < high) {
      const partitionIndex = await partition(objects, setObjects, low, high);
      await quickSortByHeightWithDelay(
        objects,
        setObjects,
        low,
        partitionIndex - 1
      );
      await quickSortByHeightWithDelay(
        objects,
        setObjects,
        partitionIndex + 1,
        high
      );
    }
  };

  const partition = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>,
    low: number,
    high: number
  ) => {
    const pivot = objects[high].height;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (objects[j].height < pivot) {
        i++;
        const temp = objects[i];
        objects[i] = objects[j];
        objects[j] = temp;
        setObjects([...objects]);
        await delay(10);
      }
    }

    const temp = objects[i + 1];
    objects[i + 1] = objects[high];
    objects[high] = temp;
    setObjects([...objects]);
    await delay(10);

    return i + 1;
  };
  const mergeSortByHeightWithDelay = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>,
    left = 0,
    right = objects.length - 1
  ) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortByHeightWithDelay(objects, setObjects, left, mid);
      await mergeSortByHeightWithDelay(objects, setObjects, mid + 1, right);
      await merge(objects, setObjects, left, mid, right);
    }
  };

  const merge = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>,
    left: number,
    mid: number,
    right: number
  ) => {
    const leftArray = objects.slice(left, mid + 1);
    const rightArray = objects.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArray.length && j < rightArray.length) {
      if (leftArray[i].height <= rightArray[j].height) {
        objects[k] = leftArray[i];
        i++;
      } else {
        objects[k] = rightArray[j];
        j++;
      }
      k++;
      setObjects([...objects]);
      await delay(10);
    }

    while (i < leftArray.length) {
      objects[k] = leftArray[i];
      i++;
      k++;
      setObjects([...objects]);
      await delay(10);
    }

    while (j < rightArray.length) {
      objects[k] = rightArray[j];
      j++;
      k++;
      setObjects([...objects]);
      await delay(10);
    }
  };

  // Heap Sort
  const heapSortByHeightWithDelay = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const n = objects.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(objects, setObjects, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      const temp = objects[0];
      objects[0] = objects[i];
      objects[i] = temp;
      setObjects([...objects]);
      await delay(10);

      // Heapify the reduced heap
      await heapify(objects, setObjects, i, 0);
    }
  };

  const heapify = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>,
    n: number,
    i: number
  ) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && objects[left].height > objects[largest].height) {
      largest = left;
    }

    if (right < n && objects[right].height > objects[largest].height) {
      largest = right;
    }

    if (largest !== i) {
      const swap = objects[i];
      objects[i] = objects[largest];
      objects[largest] = swap;
      setObjects([...objects]);
      await delay(10);

      await heapify(objects, setObjects, n, largest);
    }
  };

  // Shell Sort
  const shellSortByHeightWithDelay = async (
    objects: any[],
    setObjects: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const n = objects.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = objects[i];
        let j = i;
        while (j >= gap && objects[j - gap].height > temp.height) {
          objects[j] = objects[j - gap];
          j -= gap;
        }
        objects[j] = temp;
        setObjects([...objects]);
        await delay(10);
      }
    }
  };

  // Usage example
  const sortObjects = async (sortingFunction: Function) => {
    await sortingFunction(objects, setObjects);
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ margin: "20px" }}>
        Sorting Visualizer
      </Typography>
      <Box
        sx={{
          height: "60vh",
          width: "90vw",
          border: "1px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "2px",
        }}
      >
        {objects.map((object) => (
          <motion.div
            animate={{
              height: `${object.height}%`,
            }}
            key={object.id}
            style={{
              backgroundColor: `${object.backgroundColor}`,
              width: `${object.width}px`,
              display: "inline-block",
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          width: "80vw",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={randomData}
        >
          <span role="img" aria-label="random">
            🎲
          </span>
          Randomize
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={bublesortByHeigghtWithDelay}
        >
          <span role="img" aria-label="sort">
            🧹
          </span>
          Bubble Sort
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() =>
            sortObjects((objects, setObjects) =>
              selectionSortByHeightWithDelay(objects, setObjects)
            )
          }
        >
          <span role="img" aria-label="sort">
            🧹
          </span>
          Selection Sort
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() =>
            sortObjects((objects, setObjects) =>
              insertionSortByHeightWithDelay(objects, setObjects)
            )
          }
        >
          <span role="img" aria-label="sort">
            🧹
          </span>
          Insertion Sort
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() =>
            sortObjects((objects, setObjects) =>
              quickSortByHeightWithDelay(objects, setObjects)
            )
          }
        >
          <span role="img" aria-label="sort">
            🧹
          </span>
          Quick Sort
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() =>
            sortObjects((objects, setObjects) =>
              mergeSortByHeightWithDelay(objects, setObjects)
            )
          }
        >
          <span role="img" aria-label="sort">
            🧹
          </span>
          Merge Sort
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() =>
            sortObjects((objects, setObjects) =>
              shellSortByHeightWithDelay(objects, setObjects)
            )
          }
        >
          <span role="img" aria-label="sort">
            🧹
          </span>
          Shell Sort
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() =>
            sortObjects((objects, setObjects) =>
              heapSortByHeightWithDelay(objects, setObjects)
            )
          }
        >
          <span role="img" aria-label="sort">
            🧹
          </span>
          Heap Sort
        </motion.button>
      </Box>
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          color: "white",
          padding: "10px",
          backgroundColor: "black",
        }}
      >
        nawaz sk © 2024
      </footer>
    </Box>
  );
}

export default App;
