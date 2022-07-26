---
published: true
title: 'Making some noise sounds with elixir'
description: "How to install synthex lib and make some sound using elixir"
date: '2022-07-26'
disclaimer: false
---

## Getting Started

To produce sound waves with **elixir** - and be able to listen to them -  we're going to use the library <a target="_blank" rel="noopener" href="https://github.com/bitgamma/synthex">synthex</a> alongside with **Sound eXchange**, or sox. 

First, let's be sure we have sox installed and it's **configured in your PATH**:

For mac, just run the following homebrew command and you're good to go.
```bash
brew install sox
```

For Windows, the easiest option is install it using <a target="_blank" rel="noopener" href="https://community.chocolatey.org/packages/sox.portable">chocolatey</a>.

If you're a Debian/Ubuntu user, you can run:
```bash
sudo apt-get install sox libsox-fmt-all
```

> For more 'sox' references, check out their official <a target="_blank" rel="noopener" href="http://sox.sourceforge.net">page</a>


## Elixir

Let's create a simple module:

```bash
mix new noisemaker
```

Let's also add the `synthex` lib as dependency in `mix.exs`:

```elixir
# file: mix.exs
defp deps do
  [{:synthex, "~> 0.0.1"}]
end
```
> Remember to run `mix deps.get` after adding the library.


### Synthex: A signal synthesis library for elixir

This is a very simple library, but can be used to do some great audio synthesis. It also comes with a <a target="_blank" href="https://github.com/bitgamma/synthex/tree/master/examples">few examples</a> that can we can use to validate our environment.
The following script is the simplest example provided: a sine wave with a fixed frequency (A4 in this case: 440 Hz ).

```elixir
defmodule Sine do
  alias Synthex.Context
  alias Synthex.Output.SoxPlayer
  alias Synthex.Generator.Oscillator

  @rate 44100

  def run(duration, frequency) do
    {:ok, writer} = SoxPlayer.open(rate: @rate, channels: 2)

    context =
      %Context{output: writer, rate: @rate}
      |> Context.put_element(:main, :osc1, %Oscillator{algorithm: :sine, frequency: frequency})

    Synthex.synthesize(context, duration, fn (ctx) ->
      Context.get_sample(ctx, :main, :osc1)
    end)

    SoxPlayer.close(writer)
  end
end

Sine.run(5, 440)
```

You can obviously copy and paste this code inside the file `noisemaker/lib/noisemaker.ex` and then run `mix run` to be able to listen the first noise we made with elxir. *Remember to lower the volume down*.


### Changing a bit 

Ok. This is the sound of a sinewave of 440 Hz. Let's try to produce this same note using square waves. To achieve this with `synthex`, just change the algorithm used by the Oscillator:

```elixir
context =
    %Context{output: writer, rate: @rate}
    |> Context.put_element(:main, :osc1, %Oscillator{algorithm: :pulse, frequency: frequency})
```

> Before running this, be sure to decrease the volume from your computer.

The sound produced by a square wave with the frequency of 440 Hz is a bit disturbing, isn't it? Besides, why does the volume seem to be higher?

Well, square waves have more then the base frequency inside it. Unlike a sinewave, a square wave needs higher frequencies to sharpen the rising and falling edges, besides it's fundamental frequency (of 440 hz). Theoretically, they have have infinite bandwidth. 

That's why they sound different, because they really should, as square waves uses more higher harmonics. 

The volume of a square wave is also higher, but we din't change the amplitude of the signal. Well, a square wave is this library has it's amplitude fixed in 1, which is the maximum value of a pure sinewave.

---
Cool stuff. Let's make some sound with `Synthex` and Elixir then.

Talk soon, 

Victor Fulgêncio.


