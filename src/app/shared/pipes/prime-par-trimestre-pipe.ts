import { Pipe, PipeTransform } from '@angular/core';
import { Prime } from '../../core/models/prime.model';

@Pipe({
  name: 'primeParTrimestre',
})
export class PrimeParTrimestrePipe implements PipeTransform {
  transform(primes: Prime[] | undefined, trimestre: number): Prime | undefined {
    return primes?.find((p) => p.trimestre === trimestre);
  }
}
