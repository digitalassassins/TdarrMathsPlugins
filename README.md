# TdarrMathsPlugins - Mathematic Plugins for Tdarr

just add the **`tools`** folder from this repository to your local flows folder

{Tdarr install folder}\server\Tdarr\Plugins\FlowPlugins\LocalFlowPlugins

e.g. C:\ProgramData\Tdarr\server\Tdarr\Plugins\FlowPlugins\LocalFlowPlugins

the plugins will then show up on the **local** tab on the flows page.

## How to Use Calculations Plugin

We Start by adding a `SetFlowVariable` plugin to the flow. We dont have to set a `SetFlowVariable` if we want to start the first number at 0 but it's good practice in case you need to change the calculation starting number further down the line.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/1-Calculation-SetFlowVariable.png "Add SetFlowVariable and change the settings")

Then we can add the `Var Calculations` plugin to the flow and set the plugin settings. the `User Variable` must be the name of the variable in the first step, you can't pass `{{{args}}}` into this plugin as it uses the variable name to calculate and update that variable. We then choose the `MathOperator` and the `NumberValue` we want to calculate against the stored variable.
We can also choose the number of `DecimalPlaces` we want to round to. For example, some FFMPEG filters require the number to be rounded to 1 decimal place, passing a number with 2 decimal places will break the FFMPEG filter.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/2-Calculation-Add2.png "Add Tdarr Calculation Plugin, Tdarr add a number to a variable")

That is all there is to it, but im going to show one more example, ive added another `Var Calculations` plugin to the flow and this time I'm going to multiply by 5
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/3-Calculation-Multiply5.png "Tdarr maths multiply by a number")

As you can see by the tutorial flow what we have done above. 
1) `SetFlowVariable`
2)  `Var Calculations` plugin to +1 to Variable
3)   `Var Calculations` plugin to multiply variable x5

![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/4-Calculation-Tutorial.png "Tdarr Math Plugin Tutorial")

When we check the Job Log, we can see that the plugin has completed the calculation.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/5-Calculation-AddLogFeedback.png "Tdarr Add 1 to Number")

The same for the multiplication calculation.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/6-Calculation-MultiplyLogFeedback.png "Tdarr Multiply by a number")

## How to Use Greater / Less Than Plugin
We add the Greater/Less Than plugin to the page, the settings are self-explanatory. The first number is the first number we want to check against the second number. in the text box for the first or second number, if you would like to check variables, you must type the full variable: e.g. `{{{args.variables.user.myVariable}}}`. This allows us to match against not just the Local flow variables but the Global and Library variables as well.
So for instance, you could check if a number is greater than the video file duration using `{{{args.inputFileObj.ffProbeData.format.duration}}}` in the second number field.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/21-GreaterLess-PluginSettings.png "Add Tdarr Calculation Plugin, Tdarr add a number to a variable")

As you can see from this tutorial adding on from the last example, we can now create a count loop.
1) We add a `SetFlowVariable` and set this to 0
2) We use the `Greater / Less Than` plugin to run a check to see if the count is 10.
3) We then use the `Var Calculation` plugin to +1 to the count.
4) Once the count is greater than 10, the `Greater / Less Than` plugin will then break out to the next flow.

![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/22-GreaterLess-Tutorial.png "Add Tdarr Calculation Plugin, Tdarr add a number to a variable")

## How to Use Odd/Even Plugin
When we add the plugin to the flow, we can then edit the plugin settings. Again it's pretty self-explanatory, We add the number we want to check if it's Odd or Even into the Check Number box. Again if you would like to check variables, you must type the full variable: e.g. `{{{args.variables.user.myVariable}}}`. This allows us to match against not just the Local flow variables but also the Global and Library variables. If the number is Even it exits through point 1, if the number is odd, it exits through point 2.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/31-OddEven-PluginSettings.png "Add Tdarr Calculation Plugin, Tdarr add a number to a variable")

You can see from the tutorial image below, that we are going to do something similar with the `Var Calculation` plugin. We will set the variable as 2 and check if its odd or even. it will be Even so exit from point 1. We will then use the `Var Calculation` plugin to add one to the number, to make it an Odd number so it can progress. Why would we need an Even / Odd checker? FFMPEG Filters such as `dynaudnorm`, `atadenoise`, `convolution`, `nlmeans`, `nlmeans_vulkan` require only an odd number within a range otherwise FFMPEG will fail and spit out an error message. checking the input before we pass it to the CLI is useful to ensure it doesn't break our code. Especially when using automated calculations on the filter values.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/32-OddEven-Tutorial.png "Add Tdarr Calculation Plugin, Tdarr add a number to a variable")

## How to Use ArrayLoop Plugin



### Real World Usage Examples
