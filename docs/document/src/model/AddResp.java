// Code generated by goctl. DO NOT EDIT.
package com.xhb.logic.http.packet.bookstore.model;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import com.xhb.core.packet.HttpData;
import com.xhb.core.response.HttpResponseData;

public class AddResp extends HttpResponseData {

	private boolean ok;

	public AddResp() {
	}

	public AddResp(boolean ok) {
		this.ok = ok;
	}

	public boolean isOk() {
		return this.ok;
	}

	public void setOk(boolean ok) {
		this.ok = ok;
	}

}