# esc

这是在游戏《方块战机：永恒太阳》中使用的 Typescript 部分的代码。  
对于**开发**休闲益智游戏来说，最重要的就是数据和算法，但一般来说他们都不会消耗太多的设备资源。  
Typescript/javascript 的优点很多。对于我来说使用 Typescript 完成这一部分代码让我更有信心，而且让后续的游戏开发都建立在了一个稳固的基础上。  

当 Typescript 代码运行时，它不在乎具体游戏引擎中的视图如何变化，它只通过 deltatime 来自动推进游戏进程，然后通知游戏引擎如何渲染。  
即使在游戏引擎中某些视图或交互出错了，也可以通过 Typescript 进程的推进而自动恢复。

《方块战机：永恒太阳》游戏的 Typescript 数据核心部分的代码是开源的。对于游戏剩余的部分，我需要做的是给这个数据核心开发一层“外皮”。  
这也非常有利于不同创作引擎之间的移植，而且你不需要将二进制文件和核心的脚本混杂在一起，更容易解决升级或迁移造成的若干问题。

monorepo 包含砖块编辑器与数据核心。  
在《方块战机》原本游戏中，砖块通过随机生成，并且通过一种类似 ai 的方式检测消除区域。这样做非常不稳定而且耗费资源。  
在本作中对于数据的处理方法类似于 KONAMI 1989 年发布的 Quarth 游戏中的做法，即预先设计砖块组并标注连消区域。  
砖块编辑器（Studio）就是为了方便设计和标注而开发的工具，游戏中的任何预制数据都是从编辑器导出的。

This is a TypeScript section of code used in the game "OSSA: Eternal Sun."

For developing casual puzzle games, the most important aspects are data and algorithms, which generally do not consume too many device resources. TypeScript/JavaScript has many advantages. For me, using TypeScript to complete this code section gives me more confidence and establishes a solid foundation for future game development.

When TypeScript code runs, it doesn't concern itself with how the views in the specific game engine change. It advances the game process automatically through delta time and then informs the game engine how to render. Even if some views or interactions in the game engine go wrong, it can be automatically restored through the progression of the TypeScript process.

The TypeScript core code of the "OSSA: Eternal Sun" game is open source. For the remaining parts of the game, my task is to develop a layer of "skin" for this core data. This is also very beneficial for porting between different creative engines, and you don't need to store binary files with the core scripts in same project, making it easier to resolve various issues caused by upgrades or migrations.

The monorepo includes a map editor and the data core. In the original "OSSA" game, blocks were randomly generated and eliminated in someway like AI. This approach was very unstable and resource-intensive. In this work, the data handling method is similar to that used in Konami's 1989 game "Quarth," where block groups are pre-designed and marked for chain elimination. The block editor (Studio) was developed for the convenience of design and annotation, and any prefabricated data in the game is exported from the editor.
