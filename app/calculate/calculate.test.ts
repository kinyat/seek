import { calculateSuggestedResources } from './calculate'

describe('calculate', () => {
  describe('calculateSuggestedResources', () => {
    it('should throw error with invalid usages', () => {
      const usages = [{
        foo: 'bar'
      }]

      expect(() => calculateSuggestedResources(usages as any)).toThrow('invalid request')
    })

    it('should return suggested resources', () => {
      const usages = [
        {
          app: 'alertmanager',
          time: '20227-21T06:35:00.000Z',
          'cpu usage (mcores)': 397.5306,
          'memory usage (MiB)': 27.456854
        },
        {
          app: 'alertmanager',
          time: '20227-21T06:40:00.000Z',
          'cpu usage (mcores)': 418.9,
          'memory usage (MiB)': 27.91506
        },
        {
          app: 'grafana',
          time: '20227-21T18:10:00.000Z',
          'cpu usage (mcores)': 888.2732,
          'memory usage (MiB)': 192.055152
        },
        {
          app: 'grafana',
          time: '20227-21T18:15:00.000Z',
          'cpu usage (mcores)': 877.945,
          'memory usage (MiB)': 190.58032
        },
        {
          app: 'prometheus',
          time: '20227-21T07:05:00.000Z',
          'cpu usage (mcores)': 35004.0064,
          'memory usage (MiB)': 5078.875648
        },
        {
          app: 'prometheus',
          time: '20227-21T07:10:00.000Z',
          'cpu usage (mcores)': 36404.5536,
          'memory usage (MiB)': 5136.184832
        }
      ]

      expect(calculateSuggestedResources(usages)).toEqual({
        alertmanager: {
          cpu: {
            suggestedAllocatedResource: 69.81666666666666,
            suggestedResourceLimit: 418.9
          },
          memory: {
            suggestedAllocatedResource: 4.65251,
            suggestedResourceLimit: 27.91506
          }
        },
        grafana: {
          cpu: {
            suggestedAllocatedResource: 146.32416666666668,
            suggestedResourceLimit: 888.2732
          },
          memory: {
            suggestedAllocatedResource: 31.763386666666666,
            suggestedResourceLimit: 192.055152
          }
        },
        prometheus: {
          cpu: {
            suggestedAllocatedResource: 6067.4256,
            suggestedResourceLimit: 36404.5536
          },
          memory: {
            suggestedAllocatedResource: 856.0308053333333,
            suggestedResourceLimit: 5136.184832
          }
        }
      })
    })
  })
})
