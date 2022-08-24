import isNil from 'lodash.isnil'
import { ICalculateRequest } from '../../routes/calculate'

interface IUsage {
  // the average usage
  suggestedAllocatedResource: number

  // the max usage
  suggestedResourceLimit: number
}

interface ISuggestedResources {
  [k: string]: {
    cpu: IUsage
    memory: IUsage
  }
}

const calculateSuggestedResources = (usages: ICalculateRequest[]): ISuggestedResources => {
  return usages.reduce((prev: ISuggestedResources, curr: ICalculateRequest, _, { length }) => {
    if (isNil(curr['cpu usage (mcores)']) || isNil(curr['memory usage (MiB)']) || isNil(curr.app)) {
      throw new Error('invalid request')
    }

    if (isNil(prev[curr.app])) {
      prev[curr.app] = {
        cpu: {
          suggestedAllocatedResource: 0,
          suggestedResourceLimit: curr['cpu usage (mcores)']
        },
        memory: {
          suggestedAllocatedResource: 0,
          suggestedResourceLimit: curr['memory usage (MiB)']
        }
      }
    } else {
      prev[curr.app].cpu.suggestedAllocatedResource += (curr['cpu usage (mcores)'] / length)
      prev[curr.app].cpu.suggestedResourceLimit = Math.max(curr['cpu usage (mcores)'], prev[curr.app].cpu.suggestedResourceLimit)

      prev[curr.app].memory.suggestedAllocatedResource += (curr['memory usage (MiB)'] / length)
      prev[curr.app].memory.suggestedResourceLimit = Math.max(curr['memory usage (MiB)'], prev[curr.app].memory.suggestedResourceLimit)
    }

    return prev
  }, {})
}

export {
  calculateSuggestedResources
}
