class AddUserReferenceToSamples < ActiveRecord::Migration[5.2]
  def change
    change_table :samples do |t|
      t.belongs_to :account, index: true
    end
  end
end
