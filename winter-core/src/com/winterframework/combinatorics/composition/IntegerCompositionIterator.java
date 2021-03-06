/**
 * Combinatorics Library
 * Copyright 2012 Dmytro Paukov d.paukov@gmail.com
 */
package com.winterframework.combinatorics.composition;

import java.util.Iterator;

import com.winterframework.combinatorics.IntegerFactory;
import com.winterframework.combinatorics.IntegerGenerator;
import com.winterframework.combinatorics.IntegerVector;

/**
 * Iterator for enumerating all possible compositions
 * 
 * @author Dmytro Paukov
 * @see IntegerVector
 * @see IntegerCompositionGenerator
 * @version 2.0
 */
public class IntegerCompositionIterator implements Iterator<IntegerVector> {

	/**
	 * Generator
	 */
	protected final IntegerCompositionGenerator _generator;

	/**
	 * Current composition
	 */
	protected IntegerVector _currentComposition = null;

	/**
	 * Current index of the weak composition
	 */
	protected long _currentIndex = 0;

	/**
	 * Subset generator
	 */
	protected final IntegerGenerator _subsetGenerator;

	/**
	 * Subset iterator
	 */
	protected final Iterator<IntegerVector> _subsetIterator;

	/**
	 * Current subset
	 */
	protected IntegerVector _currentSubset = null;

	/**
	 * Constructor of the iterator
	 * 
	 * @param generator	The composition generator
	 */
	public IntegerCompositionIterator(IntegerCompositionGenerator generator) {
		super();
		_generator = generator;

		int coreSize = 0;

		if (this._generator._initialValue > 0)
			coreSize = this._generator._initialValue - 1;

		IntegerVector coreSet = IntegerFactory.createIntegerVector(coreSize);

		for (int i = 1; i < this._generator._initialValue; i++) {
			coreSet.setValue(i - 1, i);
		}

		_subsetGenerator = IntegerFactory.createIntegerSubSetGenerator(coreSet);

		_subsetIterator = _subsetGenerator.iterator();
	}

	/**
	 * Returns the next composition
	 */
	@Override
	public IntegerVector next() {
		_currentIndex++;
		_currentSubset = this._subsetIterator.next();
		return getCurrentItem();
	}

	/**
	 * Returns true when all composition are iterated
	 */
	@Override
	public boolean hasNext() {
		return this._subsetIterator.hasNext();
	}

	/**
	 * Returns current composition
	 */
	protected IntegerVector getCurrentItem() {

		int[] vector = _currentSubset.getVector();
		_currentComposition = IntegerFactory
				.createIntegerVector(vector.length + 1);

		int currentValueSubSet = 0;
		int valueCompositionElement = 0;

		for (int i = 0; i < vector.length; i++) {
			int currentSubsetElement = vector[i];
			valueCompositionElement = currentSubsetElement - currentValueSubSet;
			_currentComposition.setValue(i, valueCompositionElement);

			currentValueSubSet = currentSubsetElement;
		}
		_currentComposition.setValue(vector.length, _generator._initialValue
				- currentValueSubSet);

		return _currentComposition;
	}

	@Override
	public void remove() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns composition as a string
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "IntegerCompositionIterator=[#" + _currentIndex + ", "
				+ _currentComposition + "]";
	}

}
