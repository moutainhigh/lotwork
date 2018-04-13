package com.winterframework.firefrog.game.lock.base.p5;

import java.util.HashMap;
import java.util.Map;

import com.winterframework.combinatorics.Factory;
import com.winterframework.combinatorics.Generator;
import com.winterframework.combinatorics.ICombinatoricsVector;
import com.winterframework.firefrog.game.lock.base.LockTools;
import com.winterframework.firefrog.game.lock.base.SingleMethod;

public class X2ZXFs extends X2SingleMethod {
	@Override
	public Map<String, Integer> influncePoint() {
		Map<String, Integer> list = new HashMap<String, Integer>();
		ICombinatoricsVector<String> initialVector = Factory.createVector(betContent.split(","));
		Generator<String> gen = Factory.createSimpleCombinationGenerator(initialVector, 2);
		for (ICombinatoricsVector<String> combination : gen) {
			list.putAll(P5X2Tool.influence(false, combination.stringVal()));

		}
		return list;
	}

	public static void main(String[] s) {
		SingleMethod sm = new X2ZXFs();
		sm.setBetContent("1,2,3");
		LockTools.printList(sm.influncePoint());
	}
}
