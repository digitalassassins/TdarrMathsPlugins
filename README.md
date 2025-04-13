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

As you can see by the tutorial flow what we have done above. 1) `SetFlowVariable` 2) `Var Calculations` plugin to +1 to Variable 3) `Var Calculations` plugin to multiply variable x5
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/4-Calculation-Tutorial.png "Add SetFlowVariable and change the settings")

When we check the Job Log, we can see that the plugin has completed the calculation.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/5-Calculation-AddLogFeedback.png "Add SetFlowVariable and change the settings")

The same for the multiplication calculation.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/6-Calculation-MultiplyLogFeedback.png "Add SetFlowVariable and change the settings")

## How to Use Greater / Less Than Plugin

## How to Use Odd/Even Plugin

## How to Use ArrayLoop Plugin

### Real World Usage Examples
